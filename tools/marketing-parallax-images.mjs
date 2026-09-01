/**
 * Unique royalty-free parallax backgrounds per Digital Marketing service (Unsplash).
 * Each slug has a distinct enterprise-parallax image — no reuse across services.
 */
import { IMG } from './svc-shared-data.mjs';

const webp = (id) => {
  const base = IMG(id).replace('w=900', 'w=1920').replace('q=82', 'q=85');
  return base.includes('fit=crop') ? base : `${base}&fit=crop`;
};

export const MARKETING_ENTERPRISE_PARALLAX = {
  promotion: webp('photo-1460925895917-afdab827c52f'),
  seo: webp('photo-1432888622747-4ebee778277a'),
  'social-media-marketing': webp('photo-1611162616305-c69b3fa7fbe0'),
  'influencer-marketing': webp('photo-1529156069898-49953e39b3ac'),
  'performance-marketing': webp('photo-1551288049-bebda4e38f71'),
  'google-ads-management': webp('photo-1533750349088-cd871a165857'),
  'meta-ads-management': webp('photo-1563986768609-322da13575f3'),
  'search-engine-ads': webp('photo-1556761175-b413da4baf72'),
  'bundle-marketing': webp('photo-1542744173-8e7e53415bb0'),
  'email-marketing': webp('photo-1563013544-824ae1b704d3'),
  'whatsapp-marketing': webp('photo-1611746872915-64382b5cf6da'),
  'sms-marketing': webp('photo-1512941937669-90a1df58e7cd'),
  marketplace: webp('photo-1555421689-491a97ff9880'),
  'ecommerce-management': webp('photo-1556742049-0cfed4f6a45d'),
  'product-listing': webp('photo-1472851294608-062f824d29cc'),
  'marketplace-seo': webp('photo-1556740758-90de374c12ad'),
};

export const MARKETING_INTRO_PARALLAX = {
  promotion: webp('photo-1557804506-669a67965ba0'),
  seo: webp('photo-1504868584819-f8e8b4b6d7e3'),
  'social-media-marketing': webp('photo-1493225457124-a3eb161ffa5f'),
  'influencer-marketing': webp('photo-1522202176988-66273c2fd55f'),
  'performance-marketing': webp('photo-1551288049-bebda4e38f71'),
  'google-ads-management': webp('photo-1555949963-aa79dcee981c'),
  'meta-ads-management': webp('photo-1611926653458-092ad432d8ae'),
  'search-engine-ads': webp('photo-1467232004584-a241de8bcf5d'),
  'bundle-marketing': webp('photo-1600880292203-757bb62b4baf'),
  'email-marketing': webp('photo-1596524430616-b66d9d7ebd9e'),
  'whatsapp-marketing': webp('photo-1577563908411-5077b0dc7624'),
  'sms-marketing': webp('photo-1516321318423-f06f85e504b3'),
  marketplace: webp('photo-1556742111-e6e5970d8a8e'),
  'ecommerce-management': webp('photo-1441986300917-64674bd600d8'),
  'product-listing': webp('photo-1563013544-824ae1b704d3'),
  'marketplace-seo': webp('photo-1556745730-8893bb11b711'),
};

export const MARKETING_FEATURES_PARALLAX = {
  promotion: webp('photo-1552664730-d307ca884978'),
  seo: webp('photo-1504639725590-34d0984388bd'),
  'social-media-marketing': webp('photo-1533750349088-cd871a165857'),
  'influencer-marketing': webp('photo-1492691527719-9d1e07e534b4'),
  'performance-marketing': webp('photo-1460925895917-afdab827c52f'),
  'google-ads-management': webp('photo-1551288049-bebda4e38f71'),
  'meta-ads-management': webp('photo-1611162617474-f6829e5776a2'),
  'search-engine-ads': webp('photo-1551434678-e076c223a692'),
  'bundle-marketing': webp('photo-1553877522-43269d4ea984'),
  'email-marketing': webp('photo-1555421689-dca7e328882b'),
  'whatsapp-marketing': webp('photo-1556742049-0cfed4f6a45d'),
  'sms-marketing': webp('photo-1557804506-669a67965ba0'),
  marketplace: webp('photo-1556745730-8893bb11b711'),
  'ecommerce-management': webp('photo-1556742049-0cfed4f6a45d'),
  'product-listing': webp('photo-1556740758-90de374c12ad'),
  'marketplace-seo': webp('photo-1551288049-bebda4e38f71'),
};

export const MARKETING_CTA_PARALLAX = {
  promotion: webp('photo-1553877522-43269d4ea984'),
  seo: webp('photo-1556761175-b413da4baf72'),
  'social-media-marketing': webp('photo-1611162616305-c69b3fa7fbe0'),
  'influencer-marketing': webp('photo-1529156069898-49953e39b3ac'),
  'performance-marketing': webp('photo-1551288049-bebda4e38f71'),
  'google-ads-management': webp('photo-1533750349088-cd871a165857'),
  'meta-ads-management': webp('photo-1563986768609-322da13575f3'),
  'search-engine-ads': webp('photo-1556761175-b413da4baf72'),
  'bundle-marketing': webp('photo-1542744173-8e7e53415bb0'),
  'email-marketing': webp('photo-1563013544-824ae1b704d3'),
  'whatsapp-marketing': webp('photo-1611746872915-64382b5cf6da'),
  'sms-marketing': webp('photo-1512941937669-90a1df58e7cd'),
  marketplace: webp('photo-1555421689-491a97ff9880'),
  'ecommerce-management': webp('photo-1556742049-0cfed4f6a45d'),
  'product-listing': webp('photo-1472851294608-062f824d29cc'),
  'marketplace-seo': webp('photo-1556740758-90de374c12ad'),
};

export function getEnterpriseParallaxBg(slug) {
  return MARKETING_ENTERPRISE_PARALLAX[slug] || webp('photo-1432888622747-4ebee778277a');
}
