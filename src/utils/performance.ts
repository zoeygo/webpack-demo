// 性能监控工具

// 白屏时间：从页面开始加载到页面开始有内容的时间
export const getFP = () => {
  const performance = window.performance;
  if (!performance) return;

  const timing = performance.timing;
  if (!timing) return;

  // 白屏时间 = 页面开始显示的时间点 - 开始请求文档的时间点
  const fp = timing.domLoading - timing.navigationStart;
  console.log('白屏时间(ms):', fp);
  return fp;
};

// 首屏时间：从页面开始加载到首屏内容渲染完成的时间
export const getFCP = () => {
  const performance = window.performance;
  if (!performance) return;

  // 使用 PerformanceObserver 监听 First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        console.log('首屏时间(ms):', entry.startTime);
        observer.disconnect();
      }
    });
  });

  observer.observe({ entryTypes: ['paint'] });
};

// 页面加载完成时间
export const getLoadTime = () => {
  const performance = window.performance;
  if (!performance) return;

  const timing = performance.timing;
  if (!timing) return;

  // 页面加载完成时间 = 页面加载完成的时间点 - 开始请求文档的时间点
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  console.log('页面加载完成时间(ms):', loadTime);
  return loadTime;
};

// 初始化性能监控
export const initPerformance = () => {
  // 等待页面加载完成后执行
  window.addEventListener('load', () => {
    getFP();
    getLoadTime();
  });

  // 首屏时间监控
  getFCP();
}; 