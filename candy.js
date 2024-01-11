const url = 'https://crudcrud.com/api/ca8e5cd262c647a0bed94d1e7b483ca3';
function submitHandler(event) {
    //  This is the actual correct code for candy shop project;
    event.preventDefault();
    const name = event.target.candyName.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;

    var obj = {name, description,price,quantity };
    
   async function postDetails()
   {
    const postData = await axios.post(`${url}/appointmentdata`,obj)
    showItemsOnScreen(postData.data);

   }
   postDetails();
    
};


function showItemsOnScreen (item) {
    
    //Empty the input field :
    document.getElementById('candyName').value='';
    document.getElementById('description').value='';
    document.getElementById('price').value='';
    document.getElementById('quantity').value='';

    const parentNode = document.getElementById('listOfItems');
    const childHTML = 
        `<li id=${item._id}> ${item.name} - ${item.description} - ${item.price} Rs - <span id=quantity>${item.quantity}</span>
         <button onclick=buyOne('${item._id}','${item.quantity}')>Buy 1</button>
        <button onclick=buyTwo('${item._id}',${item.quantity})>Buy 2</button>
        <button onclick=buyThree('${item._id}',${item.quantity})>Buy 3</button>
                    </li>`

        parentNode.innerHTML = parentNode.innerHTML+childHTML;



};

async function showQuantity(itemId,quantity) 
{
      
    const getData = await axios.get(`${url}/appointmentdata/${itemId}`)
    getData.data.quantity=quantity;
 
    async function endPoint2()
    {

    //uploading data on endPoint 2 --> ChangeData
    const name = getData.data.name
    const description =getData.data.description
    const price =getData.data.price
    const quantity =getData.data.quantity
    const obj={ name,description,price,quantity}
    const postData = await axios.put(`${url}/appointmentdata/${itemId}`,obj)
    console.log(postData.data)
    showItemsOnScreen(getData.data);
    }
    endPoint2();

        
}



function buyOne(itemId,quantity) {
    console.log("Testing");
    if (quantity<1) {
        alert("Item Not Available");
    }
    quantity -=1;
    const element = document.getElementById(itemId);
    const parent = document.getElementById('listOfItems');
    parent.removeChild(element);
    showQuantity(itemId,quantity);


}

function buyTwo(itemId,quantity) {
    if (quantity<2) {
        alert("Item Not Available");
    }
    quantity -=2;  
    const element = document.getElementById(itemId);
    const parent = document.getElementById('listOfItems');
    parent.removeChild(element);
    showQuantity(itemId,quantity);  

}

function buyThree(itemId,quantity) {
    if (quantity<3) {
        alert("Item Not Available");
    }
    quantity -=3;
    const element = document.getElementById(itemId);
    const parent = document.getElementById('listOfItems');
    parent.removeChild(element);
    showQuantity(itemId,quantity);

}


//REFRESH FUNCTION : 
window.addEventListener("DOMContentLoaded", refreshFun)
async function refreshFun()
{

    const getData = await axios.get(`${url}/appointmentdata`)
    for (var i=0; i<getData.data.length; i++) {
        showItemsOnScreen(getData.data[i])
    }
    

}
