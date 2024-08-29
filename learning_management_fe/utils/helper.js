//intersection observer
export function createObserver(target, handleIntersectionCallback) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.01,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleIntersectionCallback();
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    observer.observe(target);
  }