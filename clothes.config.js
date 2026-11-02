/* 衣服的增删、排序、编辑只修改这个文件。
 * 新增：复制一条商品，设置唯一 id、名称、价格、颜色和正侧图片路径。
 * 删除：删除整条商品；暂时隐藏：加 enabled: false；排序：移动条目位置。
 * hangPoint 是图片中衣领最高点的像素坐标，用来把衣服对齐到挂杆上的挂钩；
 * bounds 是衣服在图片中实际占据的左右下边界，用来计算与相邻单品的间距。
 * 更换图片后如果数值不对，可以把整个 front/side 对象改成路径字符串，启用自动标定。
 */
window.KNIT_RAIL_CONFIG = {
  // 路径相对于本配置文件所在目录；放进网站子目录后不用改这里。
  baseURL: new URL('.', document.currentScript.src).href,
  products: [
    {
      id: 'chalk-white',
      name: '月白牛津衬衫', english: 'Chalk White Oxford',
      price: 599, color: '#efe9dc',
      note: '最干净的一件月白，是衣橱里最先被拿走的那件。',
      material: '纯棉牛津纺 · 扣领 · 单排扣',
      front: {
        src: 'assets/front/white.png',
        hangPoint: {x: 504.34, y: 19},
        bounds: {left: 18, right: 981, bottom: 1089}
      },
      side: {
        src: 'assets/side/white.png',
        hangPoint: {x: 169.89, y: 32},
        bounds: {left: 32, right: 289, bottom: 968}
      }
    },
    {
      id: 'blossom-pink',
      name: '樱粉牛津衬衫', english: 'Blossom Pink Oxford',
      price: 569, color: '#f8c3ce',
      note: '一点樱粉，让通勤的日子也柔软下来。',
      material: '纯棉牛津纺 · 扣领 · 单排扣',
      front: {
        src: 'assets/front/pink.png',
        hangPoint: {x: 504.15, y: 19},
        bounds: {left: 18, right: 981, bottom: 1090}
      },
      side: {
        src: 'assets/side/pink.png',
        hangPoint: {x: 181.66, y: 33},
        bounds: {left: 33, right: 313, bottom: 967}
      }
    },
    {
      id: 'butter-yellow',
      name: '奶黄牛津衬衫', english: 'Butter Yellow Oxford',
      price: 569, color: '#fbe389',
      note: '像午后晒过的奶油，明亮却不刺眼。',
      material: '纯棉牛津纺 · 扣领 · 单排扣',
      front: {
        src: 'assets/front/yellow.png',
        hangPoint: {x: 504.22, y: 19},
        bounds: {left: 19, right: 982, bottom: 1091}
      },
      side: {
        src: 'assets/side/yellow.png',
        hangPoint: {x: 160.34, y: 32},
        bounds: {left: 32, right: 283, bottom: 969}
      }
    },
    {
      id: 'clear-sky-blue',
      name: '晴空蓝牛津衬衫', english: 'Clear Sky Blue Oxford',
      price: 599, color: '#d2e2f4',
      note: '把晴天穿在身上，清爽得像一口凉水。',
      material: '纯棉牛津纺 · 扣领 · 单排扣',
      front: {
        src: 'assets/front/blue.png',
        hangPoint: {x: 503.83, y: 18},
        bounds: {left: 18, right: 981, bottom: 1086}
      },
      side: {
        src: 'assets/side/blue.png',
        hangPoint: {x: 143.92, y: 32},
        bounds: {left: 32, right: 264, bottom: 968}
      }
    },
    {
      id: 'caramel-brown',
      name: '焦糖棕牛津衬衫', english: 'Caramel Brown Oxford',
      price: 629, color: '#8b5535',
      note: '沉稳的焦糖棕，适合秋冬的每一次叠穿。',
      material: '纯棉牛津纺 · 扣领 · 单排扣',
      front: {
        src: 'assets/front/brown.png',
        hangPoint: {x: 504.37, y: 19},
        bounds: {left: 18, right: 981, bottom: 1088}
      },
      side: {
        src: 'assets/side/brown.png',
        hangPoint: {x: 138.34, y: 31},
        bounds: {left: 32, right: 265, bottom: 969}
      }
    }
  ]
};
