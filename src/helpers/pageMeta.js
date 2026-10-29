/**
 * Dynamic page title and meta tag updates for SEO
 */
export const updatePageMeta = ({ title, description }) => {
  if (typeof document === 'undefined') return;

  if (title) {
    document.title = `${title} | Finkuby Institutional Lending`;
  }

  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
  }
};

export default updatePageMeta;
