console.log("funciones");

let tabla = document.getElementById("container");

const getRaspberrysData = async () => {
  try {
    const url = `http://visitapp.la:4322/raspberrys/data`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getResidentials = async () => {
  try {
    const url = `http://visitapp.la:4322/residenciales/getAllResidentials`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const createListItem = (data) => {
  try {
    tabla.innerHTML = "";

    if (!data) {
      console.log(`data is ${data}`);
      tabla.innerHTML("");
    }

    let item=document.createElement('div');
    item.className="w-full h-[10%] bg-red-700  ";
    data.forEach((residencial) => {
      console.log("residencial", residencial);
     item.innerHTML = `
   <div class="w-full flex flex-row">

      <div class="w-[60px]h-[60px]">
        <img  class="w-[60px] h-[55px]" src='./assets/images/monitor.png'>
      </div>

         <p class="text-3xl font-semibold" class="font-semibold">
            ${residencial.tenant.toUpperCase()}
         </p>

          <div class="font-semibold w-[56px] h-[56px] bg-black">
            ${
              residencial.estatus
                ? ` <img  class="w-[60px] h-[55px]" src='./assets/images/correct.png'>`
                : ` <img  class="w-[60px] h-[55px]" src='./assets/images/incorrect.png'>`
            }  
          </div>
            
            <p class="font-semibold w-2/6" >
             Connected to: ${residencial.api_server} 
            </p>


    </div>
      `;
    });
    tabla.appendChild(item);
  } catch (error) {
    console.log(error);
  }
};
let resindecial = document.createElement("div");

const onloadResidentials = async () => {
  try {
    const data = await getResidentials();
    if (!data.estatus) {
      console.log(`${data.description}`);
      return;
    }

    createListItem(data.data);
  } catch (error) {
    console.log(error);
  }
};
// setInterval(() => {
//   onloadResidentials();

// }, 300000);
onloadResidentials();
