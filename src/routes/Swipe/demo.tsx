import React, { memo } from 'react';

import Swipe from './index';

const PortalHome = () => {
  const imgUrl = [
    {
      name: '1',
      url:
        'https://fsyuncai.oss-cn-beijing.aliyuncs.com/product/images/01636516683180.jpg?x-oss-process=style/marking_text_20',
    },
    {
      name: '2',
      url:
        'https://fsyuncai.oss-cn-beijing.aliyuncs.com/2022-11-11/FILE4c013942bf294364af9333ba9321f4ad.jpg?x-oss-process=style/marking_text_20',
    },
    {
      name: '3',
      url:
        'https://fsyuncai.oss-cn-beijing.aliyuncs.com/product/images/01635391443318.jpg?x-oss-process=style/marking_text_20',
    },
    {
      name: '4',
      url:
        'https://fsyuncai.oss-cn-beijing.aliyuncs.com/product/images/01622256172794.jpg?x-oss-process=style/marking_text_20',
    },
    {
      name: '5',
      url: 'https://yidayunjian.com/upload/goods/20230329/7d6211eda2c96fa25f21e24cde0818c3.jpg',
    },
    {
      name: '6',
      url:
        'https://fsyuncai.oss-cn-beijing.aliyuncs.com/2022-11-10/FILE44ff80d99f024b86af4278bb4b19d401.jpg?x-oss-process=style/marking_text_20',
    },
    {
      name: '7',
      url: 'https://static.going-link.com/develop/packages/srm-front-cux-ztyjwssc/d391c3f698f50fcce85190cfb260f04f50adb968/static/media/u46.c385c9b961396b33d988.png',
    },
  ];
  const swipeItemProps = {
    imgUrl,
    showNum: 5,
    // 外边距75px,图片间距 20px
    // (100vw - 75px*2 - 20px*4) / 5
    itemWidth: 'calc(20vw - 46px)', // 单张图片的宽度
    itemHeight: 'calc((20vw - 46px) * 1.07)', // 单张图片的高度
    itemRightMargin: '20px', // 单张图片右margin
    border: true,
    autoplay: true,
  };
  const swipeItemProps2 = {
    imgUrl: imgUrl,
    showNum: 6,
    // 外边距75px,图片间距0
    // (100vw - 75px*2) / 6
    itemWidth: 'calc((100vw / 6) - 25px)', // 单张图片的宽度
    itemHeight: 'calc(((100vw / 6) - 25px) / 1.2)', // 单张图片的高度
    autoplay: true,
  };
  return (
    <div>
      <Swipe {...swipeItemProps} />
      <br />
      <Swipe {...swipeItemProps2} />
    </div>
  );
};

export default memo(PortalHome);
