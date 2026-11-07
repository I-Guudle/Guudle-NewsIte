(function () {
  var mounts = Array.prototype.slice.call(document.querySelectorAll("section.home-plans"));
  if (!mounts.length) return;
  document.querySelectorAll("#saas-services a[href='pages/saas/pricing.html']").forEach(function (link) {
    link.setAttribute("href", "#workspace-pricing");
  });

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function money(cents, currency) {
    try {
      return new Intl.NumberFormat("en-GB", { style: "currency", currency: currency || "GBP" }).format(cents / 100);
    } catch (error) {
      return (cents / 100).toFixed(2);
    }
  }
  function storageLabel(mb) {
    if (!mb) return "";
    return mb % 1024 === 0 ? (mb / 1024) + " GB" : mb + " MB";
  }

  var plans = [];
  var interval = "monthly";

  function render(payload) {
    plans = payload.plans || [];
    mounts.forEach(function (root) { paint(root); });
    applyInterval();
    paintOfferings(payload.offerings || []);
    writeStructuredData(plans);
  }

  function paint(root) {
    var headingId = root.getAttribute("aria-labelledby") || "home-plans-heading";
    var trial = plans.filter(function (plan) { return plan.trialDays > 0 && plan.slug !== "enterprise"; })[0] || plans.filter(function (plan) { return plan.trialDays > 0; })[0];
    var keys = [];
    plans.forEach(function (plan) {
      (plan.entitlements || []).forEach(function (key) { if (keys.indexOf(key) === -1) keys.push(key); });
    });
    var saveText = saveLabel(plans);
    var head = '<div class="home-plans__head"><p class="home-plans__kicker">Our pricing plans</p><h2 id="' + esc(headingId) + '">Choose the Right Plan for Your Business</h2><p class="home-plans__lead">Compare the published workspace plans. Switch between monthly and yearly billing to see the price, what is included, and how to get started. A yearly saving is shown only when that plan’s yearly price is lower than twelve monthly payments.</p></div>';
    var trialBlock = trial ? '<div class="home-plans__trial"><div><p class="home-plans__trial-kicker">Free trial</p><h3>Try GUUDLE Free for ' + trial.trialDays + ' Days</h3><p>Registration does not start a paid subscription, and this page does not charge a card.</p></div><a class="home-plans__trial-link" href="/register?plan=' + encodeURIComponent(trial.slug) + '&interval=monthly">Start Your ' + trial.trialDays + '-Day Free Trial</a></div>' : '';
    var controls = '<div class="home-plans__controls"><div class="home-plans__switch" role="group" aria-label="Billing period"><button type="button" data-interval-choice="monthly" aria-pressed="true">Monthly</button><button type="button" data-interval-choice="yearly" aria-pressed="false">Yearly' + (saveText ? ' <span class="home-plans__save-pill">' + esc(saveText) + "</span>" : "") + '</button></div><p class="home-plans__status" role="status">' + (plans.length ? "Showing monthly prices." : "No published plans are available.") + "</p></div>";
    root.innerHTML = '<div class="home-plans__wrap">' + head + trialBlock + controls + '<div class="home-plans__grid">' + plans.map(card).join("") + "</div>" + comparison(plans, keys) + faq(plans) + '<div class="home-plans__footer"><a class="home-plans__compare" href="/pricing">Compare All Features</a><a class="home-plans__quote" href="/request-a-quote">Need a Custom Solution? Request a Quote</a></div></div>';
    root.setAttribute("data-pricing-root", "");
    bind(root);
  }

  function planIcon(slug) {
    if (slug === "growth") return "fa-chart-line";
    if (slug === "enterprise") return "fa-building";
    return "fa-rocket";
  }

  function discountPercent(plan) {
    if (!plan.savingsCents || !plan.monthlyCents) return 0;
    return Math.round((plan.savingsCents / (plan.monthlyCents * 12)) * 100);
  }

  function saveLabel(list) {
    var percents = list.map(discountPercent).filter(function (value) { return value > 0; });
    if (!percents.length) return "";
    var max = Math.max.apply(null, percents);
    var same = percents.every(function (value) { return value === percents[0]; });
    return (same ? "Save " : "Save up to ") + max + "%";
  }

  function card(plan) {
    var featured = plan.slug === "growth";
    var included = []
      .concat(plan.features || [])
      .concat([
        plan.seatLimit ? plan.seatLimit + " seats" : "",
        storageLabel(plan.storageMb) ? storageLabel(plan.storageMb) + " storage" : "",
        plan.supportLevel ? plan.supportLevel + " support" : ""
      ])
      .filter(Boolean);
    var features = included.map(function (feature) {
      return '<li><i class="fas fa-check" aria-hidden="true"></i><span>' + esc(feature) + "</span></li>";
    }).join("");
    var primary = plan.contactSales
      ? '<a class="home-plans__cta home-plans__cta--sales" data-intent="demo" href="/book-a-consultation?plan=' + encodeURIComponent(plan.slug) + '">Contact sales</a>'
      : '<a class="home-plans__cta" data-intent="' + (plan.trialDays > 0 ? "trial" : "subscribe") + '" href="/register?plan=' + encodeURIComponent(plan.slug) + '&interval=monthly">Start now</a>';
    var secondary = plan.contactSales && plan.trialDays > 0
      ? '<a class="home-plans__ghost" data-intent="trial" href="/register?plan=' + encodeURIComponent(plan.slug) + '&interval=monthly">Start ' + plan.trialDays + '-day trial</a>'
      : '<a class="home-plans__ghost" data-intent="demo" href="/book-a-consultation?plan=' + encodeURIComponent(plan.slug) + '">Book a demo</a>';
    return '<article class="home-plans__card' + (featured ? " is-featured" : "") + '" data-plan="' + esc(plan.slug) + '" data-monthly="' + plan.monthlyCents + '" data-annual="' + (plan.annualCents == null ? "" : plan.annualCents) + '" data-savings="' + (plan.savingsCents == null ? "" : plan.savingsCents) + '" data-currency="' + esc(plan.currency) + '" data-trial="' + (plan.trialDays || 0) + '">'
      + (featured ? '<span class="home-plans__badge">Recommended</span>' : "")
      + "<h3>" + esc(plan.name) + "</h3>"
      + '<div class="home-plans__medal" aria-hidden="true"><i class="fas ' + planIcon(plan.slug) + '"></i></div>'
      + '<p class="home-plans__price"><span class="home-plans__amount"></span><small class="home-plans__period"></small></p>'
      + '<p class="home-plans__equiv"></p><p class="home-plans__save"></p>'
      + '<p class="home-plans__desc">' + esc(plan.description) + "</p>"
      + '<ul class="home-plans__features">' + features + "</ul>"
      + (plan.usageNotes ? '<p class="home-plans__fine">' + esc(plan.usageNotes) + "</p>" : "")
      + (plan.setupCents ? '<p class="home-plans__fine">Setup fee ' + esc(money(plan.setupCents, plan.currency)) + ", charged once when invoiced.</p>" : "")
      + '<div class="home-plans__actions">' + primary + secondary + "</div>"
      + '<p class="home-plans__fine">This button does not charge a card.</p>'
      + "</article>";
  }

  function comparison(list, keys) {
    if (!list.length) return "";
    var header = list.map(function (plan) { return "<th scope=\"col\">" + esc(plan.name) + "</th>"; }).join("");
    function row(label, cells) { return "<tr><th scope=\"row\">" + esc(label) + "</th>" + cells + "</tr>"; }
    function cell(value) { return "<td>" + value + "</td>"; }
    var body = row("Monthly price", list.map(function (plan) { return cell(esc(money(plan.monthlyCents, plan.currency))); }).join(""))
      + row("Yearly price", list.map(function (plan) { return cell(plan.annualCents == null ? "Not published" : esc(money(plan.annualCents, plan.currency))); }).join(""))
      + row("Yearly saving", list.map(function (plan) { return cell(plan.savingsCents ? esc(money(plan.savingsCents, plan.currency)) : "None"); }).join(""))
      + row("Trial", list.map(function (plan) { return cell(plan.trialDays > 0 ? plan.trialDays + " days" : "Not offered"); }).join(""));
    keys.filter(function (key) { return key !== "support"; }).forEach(function (key) {
      body += row(key.replace(/-/g, " "), list.map(function (plan) {
        var included = (plan.entitlements || []).indexOf(key) !== -1;
        return cell(included ? '<span class="home-plans__yes"><span class="sr-only">Included</span><i class="fas fa-check" aria-hidden="true"></i></span>' : '<span class="home-plans__no"><span class="sr-only">Not included</span>—</span>');
      }).join(""));
    });
    return '<div class="home-plans__compare-wrap"><p class="home-plans__kicker">Workspace plans</p><h3>Compare plans side by side</h3><p class="home-plans__lead home-plans__lead--left">See what each workspace plan includes, then pick the billing period that fits how you work.</p><div class="home-plans__scroll"><table class="home-plans__table"><caption class="sr-only">GUUDLE workspace plans</caption><thead><tr><th scope="col">Included</th>' + header + "</tr></thead><tbody>" + body + "</tbody></table></div></div>";
  }

  function faq(list) {
    var trial = list.some(function (plan) { return plan.trialDays > 0; });
    return '<div class="home-plans__faq"><h3>Billing questions</h3>'
      + '<details><summary>Does choosing a plan charge a card?</summary><p>No. This page does not create a paid subscription. A trial or workspace registration records the selected plan. Card checkout runs on the server after you sign in, and only when Stripe is configured for that billing period.</p></details>'
      + '<details><summary>When is a yearly discount shown?</summary><p>A saving is shown only when the published yearly price is lower than twelve monthly payments. If the prices are equal, or yearly billing is not published, no discount is advertised.</p></details>'
      + (trial ? '<details><summary>How does the free trial work?</summary><p>The trial length is the number of days saved on that plan. You can cancel from the subscription page before it ends. The trial does not turn into a paid subscription because a pricing button was clicked.</p></details>' : "")
      + '<details><summary>How do I change or cancel a subscription?</summary><p>Signed-in customers request a cancellation or a plan change from their own subscription page. The change is checked on the server against the published catalog. Another organisation’s billing records are not available.</p></details>'
      + '<details><summary>What about custom or usage-priced products?</summary><p>Custom platforms use a quotation, consultation, or demonstration. Usage products show an allowance and overage only after an administrator publishes those figures.</p></details></div>';
  }

  function applyInterval() {
    mounts.forEach(applyIntervalOn);
  }

  function applyIntervalOn(root) {
    var yearly = interval === "yearly";
    root.setAttribute("data-interval", interval);
    root.querySelectorAll("[data-interval-choice]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-interval-choice") === interval ? "true" : "false");
    });
    root.querySelectorAll("[data-plan]").forEach(function (card) {
      var currency = card.getAttribute("data-currency") || "GBP";
      var monthly = Number(card.getAttribute("data-monthly"));
      var annualRaw = card.getAttribute("data-annual");
      var annual = annualRaw === "" ? null : Number(annualRaw);
      var savingsRaw = card.getAttribute("data-savings");
      var savings = savingsRaw === "" ? null : Number(savingsRaw);
      var amount = card.querySelector(".home-plans__amount");
      var period = card.querySelector(".home-plans__period");
      var equiv = card.querySelector(".home-plans__equiv");
      var save = card.querySelector(".home-plans__save");
      if (yearly && annual == null) {
        if (amount) amount.textContent = "Not published";
        if (period) period.textContent = "";
      } else {
        if (amount) amount.textContent = money(yearly ? annual : monthly, currency);
        if (period) period.textContent = yearly ? "/ year" : "/ month";
      }
      if (equiv) equiv.textContent = yearly && annual != null ? money(Math.round(annual / 12), currency) + " each month, billed yearly" : "";
      var percent = !yearly || !savings || !monthly ? 0 : Math.round((savings / (monthly * 12)) * 100);
      if (save) save.textContent = percent > 0 ? "Save " + percent + "% compared with twelve monthly payments" : "";
      var slug = card.getAttribute("data-plan");
      var queryInterval = yearly ? "annual" : "monthly";
      card.querySelectorAll("a[data-intent]").forEach(function (link) {
        var intent = link.getAttribute("data-intent");
        if (intent === "demo") link.href = "/book-a-consultation?plan=" + encodeURIComponent(slug);
        else link.href = "/register?plan=" + encodeURIComponent(slug) + "&interval=" + queryInterval + (intent === "subscribe" ? "&intent=subscribe" : "");
      });
    });
    var status = root.querySelector(".home-plans__status");
    if (status && root.querySelector("[data-plan]")) status.textContent = yearly ? "Showing yearly prices." : "Showing monthly prices.";
    var trial = root.querySelector(".home-plans__trial-link");
    if (trial) {
      var url = new URL(trial.href, window.location.origin);
      url.searchParams.set("interval", yearly ? "annual" : "monthly");
      trial.href = url.pathname + url.search;
    }
  }

  function bind(root) {
    root.querySelectorAll("[data-interval-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        interval = button.getAttribute("data-interval-choice") === "yearly" ? "yearly" : "monthly";
        applyInterval();
      });
    });
  }

  function paintOfferings(offerings) {
    offerings.forEach(function (offering) {
      var card = document.querySelector('[data-offering="' + offering.slug + '"]');
      if (!card) return;
      var badge = card.querySelector("[data-offering-approach]");
      var note = card.querySelector("[data-offering-note]");
      var label = offering.approach === "USAGE" ? "Usage-based" : offering.approach === "CUSTOM" ? "Custom quote" : "Subscription";
      if (badge) badge.textContent = label;
      if (!note) return;
      if (offering.approach === "USAGE") {
        var parts = [];
        if (offering.allowance) parts.push("Included allowance: " + offering.allowance + ".");
        if (offering.overageCents != null) parts.push("Overage: " + money(offering.overageCents, offering.currency) + ".");
        if (!parts.length) parts.push("Allowance and overage are not published yet.");
        if (offering.billingRule) parts.push(offering.billingRule);
        note.textContent = parts.join(" ");
      } else if (offering.billingRule) {
        note.textContent = offering.billingRule;
      }
    });
  }

  function writeStructuredData(list) {
    var previous = document.getElementById("home-plans-jsonld");
    if (previous) previous.remove();
    if (!list.length) return;
    var data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "GUUDLE published subscription plans",
      itemListElement: list.map(function (plan, index) {
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Offer",
            name: plan.name,
            description: plan.description,
            priceCurrency: plan.currency,
            price: (plan.monthlyCents / 100).toFixed(2),
            url: window.location.origin + "/pricing/" + plan.slug
          }
        };
      })
    };
    var script = document.createElement("script");
    script.id = "home-plans-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function unavailable() {
    mounts.forEach(function (root) {
      var status = root.querySelector(".home-plans__status");
      if (status) status.textContent = "Published prices are unavailable right now. You can still request a quotation or book a demonstration. This page does not show stand-in prices.";
      var grid = root.querySelector(".home-plans__grid");
      if (grid) grid.innerHTML = '<p class="home-plans__status">Plan prices stay hidden until the catalog responds.</p>';
    });
  }

  fetch("/api/public/plans").then(function (response) {
    if (!response.ok) throw new Error("unavailable");
    return response.json();
  }).then(function (payload) {
    if (!payload.plans || !payload.plans.length) {
      paintOfferings(payload.offerings || []);
      unavailable();
      return;
    }
    render(payload);
  }).catch(unavailable);
})();
