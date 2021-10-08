///<reference path="lib/san/types/index.d.ts" />

var fixChangeDetecorIssue = true;

var App = san.defineComponent({
    template: document.getElementById("appTmpl").innerHTML,
    initData:function(){
        return {
            list:[],
            twoWayBind:true
        }
    },
    inited:function(){
        var x = [];
        for(var i = 0;i<10;i++){
            var item = { name:'name of ' + i };

            if(i % 3 != 0){
                item.checked = true;
                item.org = {  txt: 'very good' }
            }
            else{
                item.org = null;
            }
            x.push(item);
        }
        this.data.set('list',x);
    },
    computed:{
        isAllChecked:function(){
            /**@type { any[] } */
            var list = this.data.get('list');
            var result =  list.every(function(v){  return v.checked == true }); // for IE 8, do not use arrow funtion
            console.log(result);
            return result;
        }
    },
    toggle:function(item,i){
        this.data.apply("list[" + i +   "].checked", function(v){ if(v!=true){ v= false; }  return v == true ? false: true });
    },
    /**
     * 
     * @param { MouseEvent } e 
     */
    toggleAll:function(e){
        var _this = this;
        /**@type { any[] } */
        var list = this.data.get('list');
        
        var isAll = this.data.get('isAllChecked'); // computed
        if(fixChangeDetecorIssue != true){
            list.forEach(function(v,i){  v.checked = !isAll  });
            console.log(list);
            _this.data.set('list', Object.assign([],list), { force:true }); // change detect bug/issue
        }
        else{
            list.forEach(function(v,i){
                _this.data.set('list['+ i +'].checked',!isAll);
            })
        }
    }
})


var app = new App();
app.attach(document.body);

