Component({
  properties: {
    model: Array,
    hideLineImg: Boolean,
  },
  methods: {
    toggleSpread: function(e) { // 选项展开或隐藏
      let params = {
        id: e.currentTarget.dataset.id,
        isOpen:e.currentTarget.dataset.isopen ? 0 : 1
      }
      this.triggerEvent('toggleSpread', params)
    },
    toggleChecked: function(e) { // 选中和取消checkbox
      let params = {
        id: e.currentTarget.dataset.id,
        ischecked:e.currentTarget.dataset.ischecked ? 0 : 1
      }
      this.triggerEvent('toggleChecked', params)
    },
    childToggleChecked: function(e) {
      let {id, ischecked} = e.detail
      this.triggerEvent('toggleChecked', {id, ischecked})
    },
    childToggleSpread: function(e) {
      let {id, isOpen} = e.detail
      this.triggerEvent('toggleSpread', {id, isOpen})
    }
  }
})