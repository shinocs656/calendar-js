
var dt=new Date();
dt.setMonth(1); 
function Render(){

    dt.setDate(1);
    var day=dt.getDay();

    var end=new Date(dt.getFullYear(),dt.getMonth()+1,0)
    var enddate=new Date(dt.getFullYear(),dt.getMonth()+1,0).getDate();
    var prevdate=new Date(dt.getFullYear(),dt.getMonth(),0).getDate();
    var today=new Date(); 

    var months=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
    document.getElementById('month').innerHTML=months[dt.getMonth()];
    document.getElementById('year').innerHTML=dt.getFullYear();

    var cells=" ";
    for(i=0;i<day;i++){
        cells=cells+"<div class='prev_date'>"+(prevdate-day+i+1)+"</div>"

    }
    for(i=1;i<=enddate;i++){

     var thisMonth = dt.getMonth()+1;
     var thisYear = dt.getFullYear();
     var key = JSON.stringify(i+"/"+thisMonth+"/"+thisYear);

     if(i===today.getDate() && dt.getMonth()==today.getMonth() ) {
        cells=cells+"<div class='today'  onclick='dynamic("+key+")'   ><button >"+ i +"</button></div>"
    }else{
        cells=cells+"<div onclick='dynamic("+key+")' ><button >"+ i +"</button></div>"
    }
}
document.getElementsByClassName("days")[0].innerHTML=cells;


}
function movedata(para){
    if(para=='prev'){
        dt.setMonth(dt.getMonth()-1);
        
    }else{
        dt.setMonth(dt.getMonth()+1);
        
    }
    Render();
    
}
let popup=document.getElementById('pop-up');
let close=document.getElementById('close');

close.addEventListener('click',function(){
    popup.style.display='none';

})
function additem(){
    var ul=document.getElementById('dynamic_element');
    var candidate=document.getElementById('candidate');
    var li=document.createElement('li');
    li.setAttribute('id',candidate.value);
    li.appendChild(document.createTextNode(candidate.value));
    ul.appendChild(li);

    var key = document.getElementById('current_date_key').innerHTML;
    console.log(key)

    var current_items = localStorage.getItem(key);
    console.log(current_items)
    if(current_items!=null){
        var items = current_items + ',' +candidate.value;
        console.log(items);
    }else{
        var items = candidate.value;
        console.log(items)
    }

    localStorage.setItem(key, items);

    candidate.value=null;


}
function removeitem()
{
    var ul=document.getElementById('dynamic_element');
    var candidate=document.getElementById('candidate');
    var item=document.getElementById(candidate.value);
    ul.removeChild(item);

    var li_items = ul.querySelectorAll('li');
    console.log(li_items);
    var items = '';

    li_items.forEach(list_update);
    function list_update(item, index) {
        items += ','+item.innerHTML;
    }
    console.log(items);
    if(items[0]==','){
        items = items.substring(1);
        console.log(items);
    }

    var key = document.getElementById('current_date_key').innerHTML;
    localStorage.setItem(key, items);

    candidate.value=null;
}

function dynamic(date){
    popup.style.display='block';
    document.getElementById('current_date').innerHTML=date+' - Events';
    console.log(date)
    document.getElementById('current_date_key').innerHTML=date;
    var items = '';
    items = localStorage.getItem(date);
    console.log(items);

    var ul=document.getElementById('dynamic_element');
    ul.innerHTML = '';

    if(items!=null){
     var items = items.split(',');
    console.log(items)

     items.forEach(list_update);

     function list_update(item, index) {
      var li=document.createElement('li');
      li.setAttribute('id',item);
      li.appendChild(document.createTextNode(item));
      ul.appendChild(li); 
        
  } 
}

}
