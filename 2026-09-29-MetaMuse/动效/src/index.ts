import { registerRoot } from 'remotion';
import { Root } from './Root';

// 吞掉浏览器钱包类插件 (MetaMask / OKX 等的 inpage.js) 往页面抛的未处理 rejection,
// 否则 Studio 的报错浮层会把它显示成 [object Object] (与本模板无关)
if (typeof window !== 'undefined') {
  window.addEventListener(
    'unhandledrejection',
    (e: PromiseRejectionEvent) => {
      const r: any = e.reason || {};
      const msg = typeof r === 'object' ? String(r.message || '') : String(r);
      // 只拦钱包插件的错误 (用户拒绝签名的 4001, 或消息里带 wallet / inpage / ethereum); 模板自己的报错照常显示
      if (r.code === 4001 || /wallet|inpage|ethereum/i.test(msg)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true, // 捕获阶段, 抢在 Remotion 的处理器之前
  );
}

registerRoot(Root);
