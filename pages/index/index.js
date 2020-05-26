//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    treeList:[
      {
        text:'渠道',
        id: 1,
        isOpen: true,
        nodes:[
          {
            text:'渠道一组',
            id: 2,
            isOpen: true,
            nodes:[
              {
                text:'渠道一组4',
                id: 3,
                isOpen: true,
              },
              {
                text:'渠道二组5',
                id: 4,
                isOpen: true,
                nodes:[
                  {
                    text:'4-1',
                    id: 100,
                    isOpen: true,
                    nodes: [
                      {
                        text:'4-1-1',
                        id: 101,
                        isOpen: true,
                      }
                    ]
                  },
                  {
                    text:'4-2',
                    id: 102,
                    isOpen: true,
                  }
                ]
              }
            ]
          },
          {
            text:'渠道二组',
            id: 5,
            isOpen: true,
            nodes:[
              {
                text:'渠道一组4',
                id: 6,
                isOpen: true,
              },
              {
                text:'渠道二组5',
                id: 7,
                isOpen: true,
              }
            ]
          }
        ]
      },
      {
        text:'渠道',
        id: 8,
        isOpen: true,
        nodes:[
          {
            text:'渠道一组',
            id: 9,
            isOpen: true
          },
          {
            text:'渠道二组',
            id: 10,
            isOpen: true
          },
          {
            text:'渠道三组',
            id: 11,
            isOpen: true
          }
        ]
      }
    ]
  },
  toConfirm: function(e) {
    console.log(e.detail)
  },
  toReset: function() {}
})
