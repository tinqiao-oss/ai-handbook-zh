// 品牌标记: 用首字母徽章指代某个产品 / 平台, 不画任何品牌的真实 Logo (商标归各自所有者).
// 想用真实品牌图形, 可以自己装图标库 (例如 simple-icons), 但要逐个确认每个图标的许可和商标使用规则.
import React from 'react';
import { FONT } from './fonts';

export type BrandMark = { title: string };

export const Brand: React.FC<{ icon: BrandMark; size: number; color?: string; style?: React.CSSProperties }> = ({ icon, size, color = '#4A5160', style }) => (
  <div
    title={icon.title}
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      border: `${Math.max(1.5, size * 0.07)}px solid ${color}`,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT.display,
      fontWeight: 800,
      fontSize: size * 0.5,
      lineHeight: 1,
      boxSizing: 'border-box',
      flex: 'none',
      ...style,
    }}
  >
    {[...icon.title][0]}
  </div>
);
