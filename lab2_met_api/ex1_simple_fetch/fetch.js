const searchUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflower';
const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

const departmentUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/departments/';
// const IslamicArDeptUrl = ''

fetchMuseumData(searchUrl);

// getUrl(IslamicArtDeptUrl);

// function getUrl(departmentUrl) {
//   window
//     .fetch(url)
//     .then(data => data.json())
//     .then(data => {
//       console.log(data);
//       //fetchObjects(data);

//     });
// }



let metData;
let myArray = [];

// fetch a query
function fetchMuseumData(url) {
  window
    .fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      fetchObjects(data);
    });
}

// from the response, fetch objects
function fetchObjects(data){
// fetchObjects(data).slice(0,5)
  let objectIDs = data.objectIDs;
  console.log("fetching: " + objectIDs.length + " objects");
  objectIDs.forEach(function(n) {
    // console.log(objectBaseUrl + n);
    let objUrl = objectBaseUrl + n;
    window
      .fetch(objUrl)
      .then(data => data.json())    // "data" name can be anything; just named so to make more understandable
      .then(data => {
        // console.log(data);
        addObject(data);
      });
  });
}

// create your own array using just the data you need
function addObject(objectData){
    var currentID = objectData.objectID;
    var currentTitle = objectData.title;
    var currentDate = objectData.objectBeginDate;
    var imgUrl = objectData.primaryImage;
    var index = myArray.length;
    myArray[index] = {};
    myArray[index]["title"] = currentTitle;
    myArray[index]["date"] = currentDate;
    myArray[index]["image"] = imgUrl;
    
    // or a more concise way:
    /* myArray.push({
      title: objectData.title,
      date: objectData.objectBeginDate,
      image: objectData.primaryImage});
    }) */
    
    console.log(myArray[index]);
}
