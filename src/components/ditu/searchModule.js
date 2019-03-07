

var searchModule ={
    input: function(item) {
        let list = [],con
        item.map((d,index) => {
            
            console.log(index,d.type)
            switch(d.type)
            {
                case 'input':
                console.log('input')
                con = '<input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner" style="width:150px;height:32px;">'
                break;
                case 'tree_select':
                console.log('tree_select')
                con = '<el-input placeholder="请输入内容" size="small"></el-input>';
                break;               
                default:
                console.log('input')
            }
            list.push(con)
        })
        return list
    }
}

export default searchModule