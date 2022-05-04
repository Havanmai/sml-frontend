export class ColorModel {
  title: string;
  value: string;
  key: string;
  children: ColorModel[];
}
const listColor = [
  'Đỏ',
  'Xanh lá cây',
  'Xanh ngọc',
  'Lam',
  'Lục',
  'Vàng',
  'Cam',
  'Nâu',
  'Trắng',
  'Đen',
  'Xám',
  'Tím',
];
const listData = [];
listColor.forEach((item, index) => {
  let itemColorMain = {
    title: item,
    value: `0-${index}`,
    key: `0-${index}`,
    children: [
      {
        title: `${item} nhạt`,
        value: `0-${index}-${index + 1}`,
        key: `0-${index}-${index + 1}`,
        isLeaf: true,
      },
      {
        title: `${item} thường`,
        value: `0-${index}-${index + 2}`,
        key: `0-${index}-${index + 2}`,
        isLeaf: true,
      },
      {
        title: `${item} đậm`,
        value: `0-${index}-${index + 3}`,
        key: `0-${index}-${index + 3}`,
        isLeaf: true,
      },
    ],
  };
  listData.push(itemColorMain);
});

export const DataColor = listData;
