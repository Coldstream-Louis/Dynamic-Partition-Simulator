/**
 * Created by dushuyang on 17/5/17.
 */

// 首次适配算法
current_1 = 0;      // 目前已经添加的进程数
var space_1 = new Array();  // 当前空余空间的列表,数组中的值为各空余空间的大小
space_1[0] = 640;
var start_1 = new Array();  // 当前各个空余的空间的起始位置
start_1[0] = 0;
var list_1 = new Array();  // 当前的进程列表,添加的第一个进程为list_1[1]
list_1[0] = 0;

// 最佳适配算法
current_2 = 0;      // 目前已经添加的进程数
var space_2 = new Array();  // 当前空余空间的列表,数组中的值为各空余空间的大小
space_2[0] = 640;
var start_2 = new Array();  // 当前各个空余的空间的起始位置
start_2[0] = 0;
var list_2 = new Array();  // 当前的进程列表,添加的第一个进程为list_2[1]
list_2[0] = 0;

// 首次适配算法
var s_1 = document.getElementById("size_1");      // 输入添加进程的大小
var n_1 = document.getElementById("free_number_1");    // 输入删除进程的序号

// 最佳适配算法
var s_2 = document.getElementById("size_2");      // 输入添加进程的大小
var n_2 = document.getElementById("free_number_2");    // 输入删除进程的序号

// 首次适配算法添加新进程
function add_1()
{
    var size= parseInt(s_1.value);  // 获取新进程所需内存空间
    if(size <= 0)                   // 提示输入的值不符合要求
    {
        alert("请输入正确的值!");
        return;
    }
    var start = select_1(size);  // 调用select函数计算应该插入哪个空余空间
    if(start === -1)             // 如果没有可以添加的空间,提示内存溢出
    {
        alert("内存溢出,无法添加!");
        return;
    }
    var t = start + 50;                   // 添加div块,表示新进程
    var mission = document.createElement("div");
    if(size < 20)
        mission.style.fontSize="5px";
    mission.style.textAlign="center";
    mission.style.color="white";
    mission.style.position="absolute";
    mission.style.border="1px solid white";
    mission.style.background="#0000FF";
    mission.style.width="148px";
    mission.style.height=size-2+"px";
    mission.style.left="50px";
    mission.style.top=t+"px";
    document.body.appendChild(mission);
    list_1[++current_1] = mission;                // 新进程加入列表中
    mission.innerHTML=current_1+" - "+size+"K";          // 显示进程序号和所占空间
}

// 首次适配,选择空间插入
function select_1(size)
{
    var is_ok=false;            // 是否有合适的空间
    var number=0;               // 第一个合适的空间在列表中的序号
    for(var i=0; i<space_1.length; i++)     // 搜寻合适的空间
    {
        if (size <= space_1[i])       // 得到合适的空间,因为是首次适配,所以记下空间序号后直接跳出循环
        {
            is_ok = true;
            number = i;
            break;
        }
    }
    if(is_ok === false)         // 没有合适的空间,返回-1
        return -1;
    else if(size === space_1[number])      // 空间大小正好等于新进程大小,调用delete函数去除这个空间,并返回该空间起始位置值
    {
        var re = start_1[number];
        delete_space_1(number);
        return re;
    }
    else                        // 空间大于进程大小,则修改该空间的起始位置和大小,并返回原先的起始位置值
    {
        space_1[number]=space_1[number]-size;
        var r = start_1[number];
        start_1[number] = start_1[number] + size;
        return r;
    }
}

// 去除一个空余空间
function delete_space_1(number)
{
    if(space_1.length === 1)      // 如果只有一个空间
    {
        space_1[0] = 0;
        start_1[0] = -1;
    }
    else
    {
        for(var i=number; i<space_1.length-1; i++)    // 去除这个空间后,后面的空间序号改变
        {
            space_1[i] = space_1[i+1];
            start_1[i] = start_1[i+1];
        }
        space_1.splice(space_1.length-1, 1);
        start_1.splice(start_1.length-1, 1);
    }
}

// 最佳适配算法添加新进程
function add_2()
{
    var size= parseInt(s_2.value);  // 获取新进程所需内存空间
    if(size <= 0)                   // 提示输入的值不符合要求
    {
        alert("请输入正确的值!");
        return;
    }
    var start = select_2(size);  // 调用select函数计算应该插入哪个空余空间
    if(start === -1)             // 如果没有可以添加的空间,提示内存溢出
    {
        alert("内存溢出,无法添加!");
        return;
    }
    var t = start + 50;                   // 添加div块,表示新进程
    var mission = document.createElement("div");
    if(size < 20)
        mission.style.fontSize="5px";
    mission.style.textAlign="center";
    mission.style.color="white";
    mission.style.position="absolute";
    mission.style.border="1px solid white";
    mission.style.background="#0000C6";
    mission.style.width="148px";
    mission.style.height=size-2+"px";
    mission.style.left="650px";
    mission.style.top=t+"px";
    document.body.appendChild(mission);
    list_2[++current_2] = mission;                // 新进程加入列表中
    mission.innerHTML=current_2+" - "+size+"K";          // 显示进程序号和所占空间
}

// 最佳适配,选择空间插入
function select_2(size)
{
    var content = 0;
    var is_ok=false;            // 是否有合适的空间
    var number=0;               // 最佳空间在列表中的序号
    for(var i=0; i<space_2.length; i++)      // 搜寻最佳合适空间
    {
        if (size <= space_2[i])          // 因为是最佳适配,所以要搜寻所有的合适空间
        {
            if(is_ok === false)          // 找到第一个合适空间
            {
                is_ok = true;
                number = i;
            }
            else if(space_2[i] < space_2[number])      // 若后面找到更加合适的空间,则改变最佳空间的序号
                number = i;
        }
    }
    if(is_ok === false)         // 没有合适的空间,返回-1
        return -1;
    else if(size === space_2[number])      // 空间大小正好等于新进程大小,调用delete函数去除这个空间,并返回该空间起始位置值
    {
        var re = start_2[number];
        delete_space_2(number);
        return re;
    }
    else                        // 空间大于进程大小,则修改该空间的起始位置和大小,并返回原先的起始位置值
    {
        space_2[number]=space_2[number]-size;
        var r = start_2[number];
        start_2[number] = start_2[number] + size;
        return r;
    }
}

// 去除一个空余空间
function delete_space_2(number)
{
    if(space_2.length === 1)      // 如果只有一个空间
    {
        space_2[0] = 0;
        start_2[0] = -1;
    }
    else
    {
        for(var i=number; i<space_2.length-1; i++)    // 去除这个空间后,后面的空间序号改变
        {
            space_2[i] = space_2[i+1];
            start_2[i] = start_2[i+1];
        }
        space_2.splice(space_2.length-1, 1);
        start_2.splice(start_2.length-1, 1);
    }
}

// 删除内存中现有的进程
function remove_mission(type)
{
    if(type === 1)          // 删除首次适配中的进程
    {
        var number = parseInt(n_1.value);          // 获取要删除的进程的序号
        var x = list_1[number].offsetTop-50;        // 获取要删除的进程在内存中的起始位置
        var newSpace = list_1[number].offsetHeight;   // 获取要删除的进程的大小
        var y = x + newSpace;                        // 获取要删除的进程在内存中的终止位置
        create_space_1(x, y, newSpace);              // 删除该进程以创造新的空间
        document.body.removeChild(list_1[number]);      // 在页面上删除进程的显示
    }
    else                    // 删除最佳适配中的进程
    {
        var number = parseInt(n_2.value);          // 获取要删除的进程的序号
        var x = list_2[number].offsetTop-50;        // 获取要删除的进程在内存中的起始位置
        var newSpace = list_2[number].offsetHeight;   // 获取要删除的进程的大小
        var y = x + newSpace;                        // 获取要删除的进程在内存中的终止位置
        create_space_2(x, y, newSpace);              // 删除该进程以创造新的空间
        document.body.removeChild(list_2[number]);      // 在页面上删除进程的显示
    }
}

// 在首次适配的内存中删除的进程处产生新的空间
function create_space_1(x, y, newSpace)
{
    var is_merge = false;                  // 新空间是否需要和现有空间合并
    for(var i=0; i<start_1.length; i++)
    {
        if(start_1[i]+space_1[i] === x)         // 如果新空间要与前面的进程合并
        {
            is_merge = true;
            space_1[i] = space_1[i] + newSpace;
        }
        else if(y === start_1[i])         // 如果新空间要与后面的进程合并
        {
            if(is_merge === true)         // 如果新空间已经与前面的进程合并,又要与后面的进程合并
            {
                space_1[i-1] = space_1[i-1] + space_1[i];
                delete_space_1(i);
            }
            else                          //  如果新空间只与后面的进程合并
            {
                is_merge = true;
                space_1[i] = space_1[i] + newSpace;
                start_1[i] = x;
            }
        }
    }
    if(is_merge === false)              // 如果新空间不需与现有空间合并,新建一个空间
    {
        var is_last = true;             // 新空间是否为内存上的最后一个空间
        for(var i=0; i<start_1.length; i++)
        {
            if(start_1[i] > y)           // 新空间不是最后一个空间,新建空间后后面原有的空间序号+1
            {
                is_last = false;
                for(var j=start_1.length; j>i; j--)
                {
                    start_1[j] = start_1[j-1];
                    space_1[j] = space_1[j-1];
                }
                start_1[i] = x;
                space_1[i] = newSpace;
                break;
            }
        }
        if(is_last === true)            // 新空间为内存上的最后一个空间
        {
            if(start_1[0]===-1)         // 删除前内存已满的情况
            {
                start_1[0] = x;
                space_1[0] = newSpace;
            }
            else                        // 删除前内存未满的情况
            {
                var old_length = start_1.length;
                start_1[old_length] = x;
                space_1[old_length] = newSpace;
            }
        }
    }
}

// 在最佳适配的内存中删除的进程处产生新的空间, 由于逻辑与create_space_1函数一样, 这里就不作注释了
function create_space_2(x, y, newSpace)
{
    var is_merge = false;
    for(var i=0; i<start_2.length; i++)
    {
        if(start_2[i]+space_2[i] === x)
        {
            is_merge = true;
            space_2[i] = space_2[i] + newSpace;
        }
        else if(y === start_2[i])
        {
            if(is_merge === true)
            {
                space_2[i-1] = space_2[i-1] + space_2[i];
                delete_space_2(i);
            }
            else
            {
                is_merge = true;
                space_2[i] = space_2[i] + newSpace;
                start_2[i] = x;
            }
        }
    }
    if(is_merge === false)
    {
        var is_last = true;
        for(var i=0; i<start_2.length; i++)
        {
            if(start_2[i] > y)
            {
                is_last = false;
                for(var j=start_2.length; j>i; j--)
                {
                    start_2[j] = start_2[j-1];
                    space_2[j] = space_2[j-1];
                }
                start_2[i] = x;
                space_2[i] = newSpace;
                break;
            }
        }
        if(is_last === true)
        {
            if(start_2[0]===-1)
            {
                start_2[0] = x;
                space_2[0] = newSpace;
            }
            else
            {
                var old_length = start_2.length;
                start_2[old_length] = x;
                space_2[old_length] = newSpace;
            }
        }
    }
}