Component({
  properties: {
    model: Array,
  },
  data: {
    checkedItemIndexStr: null //被点击元素的index"0-0-0"格式
  },
  methods: {
    toggleSpread: function(e) { // 选项展开或隐藏
      let {id, isOpen} = e.detail
      this.checkedChild(this.data.model, id, isOpen, 'isOpen')
    },
    toggleChecked: function(e) { // 选中和取消checkbox
      let {id, ischecked} = e.detail
      this.checkedChild(this.data.model, id, ischecked, 'isChecked')
    },
    checkedChild: function(array, id, toggleBoolean, toggleAttr) {
      let indexArray = this.getTargetIndex(array,id).split('-')
      let targetIndexs = indexArray.map(item=>`[${Number(item)}]`) //["[0]","[1]","[1]"]
      this.toSetData(`model${targetIndexs.join('nodes')}`,toggleBoolean, toggleAttr)
      let targetChilds = [] //被点击目标元素的所有子元素组
      let ps = []
      let r = ''
      function getNeedItems(indexArray,j, modelArray) {
        for (let i = j; i < indexArray.length; i++) { // 0,1  [0,0,0]
          targetChilds = modelArray[indexArray[i]].nodes
          if (i<indexArray.length-1) { //点击最顶级的时候忽略不计
            r+=`[${indexArray[i]}].nodes`
            ps.unshift({sibling:modelArray[indexArray[i]].nodes, checkedItem:`model${r.substr(0, (r.length-5))}isChecked`}) //
          }
          if (modelArray[indexArray[i]].nodes && i<indexArray.length-1) { 
            let subArray = modelArray[indexArray[i]].nodes
            targetChilds = [] //万一点击最后一项，没有子元素
            getNeedItems(indexArray, ++i, subArray)
          } 
          return
        }
      }
      getNeedItems(indexArray, 0, array)
      this.checkedAllChildren(targetChilds, `model${targetIndexs.join('nodes')}.nodes`, toggleBoolean, toggleAttr)
      ps.forEach(items => {
        this.controlPatentCheckbox(items.sibling, items.checkedItem)
      })
    },
    getTargetIndex: function(array,id) { //点击的目标元素的index字符串"0-1-2"的形式
      let indesStr = null
      let _this = this
      const getIndexs = function (array, id, parentIdex) {
        if (array && array.length) {
          for (let i = 0;i < array.length; i++) {
            if (parentIdex) {
              indesStr = `${parentIdex}-${i}`
            } else { // 最高级没有父级,前面没有"-""
              indesStr = `${i}`
            }
            if (array[i].id == id) {
              _this.setData({
                checkedItemIndexStr: indesStr
              })
              return
            }
            getIndexs(array[i].nodes, id, indesStr)
          }
        }
      }
      getIndexs(array, id)
      return this.data.checkedItemIndexStr
    },
    controlPatentCheckbox: function(array, checkedItem) { //子框全选中,父框选中,否则父框取消选中
      if (!array || !array.length) { //已经是第一级，没有父级
        return
      }
      let checkeds = []
      array.forEach(item => {
        if (item.isChecked) {
          checkeds.push(item)
        }
      })
      if (checkeds.length == array.length) {
        let checked = checkedItem
        this.setData({
          [checked]: 1
        })
      } else {
        let checked = checkedItem
        this.setData({
          [checked]: 0
        })
      }
    },
    toSetData: function(setItem, toggleBoolean, toggleAttr) { //设置checkbox状态
      let checked = `${setItem}.${toggleAttr}`
      this.setData({
        [checked]: toggleBoolean
      })
    },
    checkedAllChildren: function(array, setItem, toggleBoolean, toggleAttr) { //选中或取消目标元素的所所有子元素
      if (array && array.length) {
        array.forEach((subitem, subindex) => {
          let b = `${setItem}.[${subindex}].nodes`
          this.toSetData(`${setItem}.[${subindex}]`,toggleBoolean, toggleAttr)
          this.checkedAllChildren(subitem.nodes, b, toggleBoolean, toggleAttr)
        })
      }
    },
    toReset: function() { // 重置
      let isChecked = 0
      this.data.model.forEach(item=>{
        this.checkedChild(this.data.model, item.id, isChecked, 'isChecked')
      })
      this.triggerEvent('toReset',this.data.model)
    },
    toConfirm: function() { // 确定
      this.triggerEvent('toConfirm',this.data.model)
    },
  }
})