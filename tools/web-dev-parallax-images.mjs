/**
 * Unique parallax backgrounds per Web Development service (Unsplash).
 */
import { IMG } from './svc-shared-data.mjs';

const webp = (id) => {
  const base = IMG(id).replace('w=900', 'w=1920').replace('q=82', 'q=85');
  return base.includes('fit=crop') ? base : `${base}&fit=crop`;
};

export const WEB_DEV_ENTERPRISE_PARALLAX = {
  'website-development': webp('photo-1498050108023-c5249f4df085'),
  'business-website': webp('photo-1467232004584-a241de8bcf5d'),
  ecommerce: webp('photo-1556742049-0cfed4f6a45d'),
  cms: webp('photo-1432888492376-944dee89ba04'),
  'frontend-development': webp('photo-1555066931-4365d14bab8c'),
  'backend-development': webp('photo-1558494949-ef010cbdcc31'),
  'full-stack-development': webp('photo-1504638318981-a097836b4284'),
  'marketplace-development': webp('photo-1556740758-90de374c12ad'),
  'web-portal-development': webp('photo-1551434678-e076c223a692'),
  'cloud-solutions': webp('photo-1451187580459-43490279c0fa'),
  'seo-digital-optimization': webp('photo-1432888622747-4ebee778277a'),
  'maintenance-support': webp('photo-1521791136064-7986c2920216'),
  'ui-ux-design': webp('photo-1581291518857-4e27b16325c1'),
  'website-security': webp('photo-1555949963-aa79dcee981c'),
  'legacy-modernization': webp('photo-1551288049-bebda4e38f71'),
  'emerging-web-technologies': webp('photo-1677442136019-21780ecad995'),
};

export const WEB_DEV_INTRO_PARALLAX = {
  'website-development': webp('photo-1522071820081-009f0129c71c'),
  'business-website': webp('photo-1547658719-da2b51169166'),
  ecommerce: webp('photo-1472851294608-062f824d29cc'),
  cms: webp('photo-1499750310107-5fef5847a609'),
  'frontend-development': webp('photo-15876286592822-26366e30e03c'),
  'backend-development': webp('photo-1517694712202-14dd95345aa0'),
  'full-stack-development': webp('photo-1553877522-43269d4ea984'),
  'marketplace-development': webp('photo-1441986300917-64674bd600d8'),
  'web-portal-development': webp('photo-1497366216548-37526070297c'),
  'cloud-solutions': webp('photo-1544197150-b99a580bb7a8'),
  'seo-digital-optimization': webp('photo-1504868584819-f8e8b4b6d7e3'),
  'maintenance-support': webp('photo-1553877522-43269d4ea984'),
  'ui-ux-design': webp('photo-1561070791-2526d30994b5'),
  'website-security': webp('photo-1563986768609-322da13575f3'),
  'legacy-modernization': webp('photo-1517245386807-bb43f82c33c4'),
  'emerging-web-technologies': webp('photo-1620712943543-bcc4688e7485'),
};

export const WEB_DEV_FEATURES_PARALLAX = {
  'website-development': webp('photo-1460925895917-afdab827c52f'),
  'business-website': webp('photo-1559028012-481c04fa702d'),
  ecommerce: webp('photo-1556745730-8893bb11b711'),
  cms: webp('photo-1486312338219-ce68d2c6f44d'),
  'frontend-development': webp('photo-1498050108023-c5249f4df085'),
  'backend-development': webp('photo-1454165804606-c3d57bc86b40'),
  'full-stack-development': webp('photo-1504638318981-a097836b4284'),
  'marketplace-development': webp('photo-1556742049-0cfed4f6a45d'),
  'web-portal-development': webp('photo-1551434678-e076c223a692'),
  'cloud-solutions': webp('photo-1451187580459-43490279c0fa'),
  'seo-digital-optimization': webp('photo-1460925895917-afdab827c52f'),
  'maintenance-support': webp('photo-1521791136064-7986c2920216'),
  'ui-ux-design': webp('photo-1581291518857-4e27b16325c1'),
  'website-security': webp('photo-1555949963-aa79dcee981c'),
  'legacy-modernization': webp('photo-1551288049-bebda4e38f71'),
  'emerging-web-technologies': webp('photo-1677442136019-21780ecad995'),
};

export const WEB_DEV_CTA_PARALLAX = {
  'website-development': webp('photo-1551434678-e076c223a692'),
  'business-website': webp('photo-1467232004584-a241de8bcf5d'),
  ecommerce: webp('photo-1556740758-90de374c12ad'),
  cms: webp('photo-1454165804606-c3d57bc86b40'),
  'frontend-development': webp('photo-1498050108023-c5249f4df085'),
  'backend-development': webp('photo-1558494949-ef010cbdcc31'),
  'full-stack-development': webp('photo-1504638318981-a097836b4284'),
  'marketplace-development': webp('photo-1556742049-0cfed4f6a45d'),
  'web-portal-development': webp('photo-1497366216548-37526070297c'),
  'cloud-solutions': webp('photo-1544197150-b99a580bb7a8'),
  'seo-digital-optimization': webp('photo-1432888622747-4ebee778277a'),
  'maintenance-support': webp('photo-1521791136064-7986c2920216'),
  'ui-ux-design': webp('photo-1561070791-2526d30994b5'),
  'website-security': webp('photo-1563986768609-322da13575f3'),
  'legacy-modernization': webp('photo-1517245386807-bb43f82c33c4'),
  'emerging-web-technologies': webp('photo-1620712943543-bcc4688e7485'),
};

export function getWebDevEnterpriseParallaxBg(slug) {
  return WEB_DEV_ENTERPRISE_PARALLAX[slug] || webp('photo-1498050108023-c5249f4df085');
}
