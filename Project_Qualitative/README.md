## Quantitative Visualization



### Introduction
-------------------------

This folder contains the Qualitative Visualization project, wherein data from the Metropolitan Museum of Art (the MET) 
is used in a D3 Narrative timeline to investigate the Evolution of Medieval Footsoldier Arms and Armor.


If you want to skip all the details and just see the final product, go [here](https://htmlpreview.github.io/?https://github.com/acdreyer/PGDV5200_MajorStudio1/blob/master/Project_Qualitative/index.html).


For the related Quantitative project using a Packed Bar Chart, go [here](https://github.com/acdreyer/PGDV5200_MajorStudio1/blob/master/Project_Quantitative/README.md)




### Concept
-------------------------

This project builds on various aspects of the [MET Open Access](https://www.metmuseum.org/about-the-met/policies-and-documents/open-access)
initiative (in excess of 400,000 items). The MET Open Access [CSV](https://github.com/metmuseum/openaccess) was used
for conceptual study, after which it was supplemented by data from the [MET API](https://metmuseum.github.io/).

In order to sort and filter relevant data from the MET CSV, the R software package
was used to repackage data in a meaningful way and to explore interesting groupings.
It was decided to focus on the Arms and Armor department.

Fields that contained the cleanest data was the Object Names, Begin and End dates.
Even though object Cultures were sparsely populated for various departments, 
the Arms and Armor dataset on Cultures was relatively clean. 
By exploring the data it soon became apparent that a variety of exploratory topics was possible, not limited to, but including:

* Samurai Sword Quality and shape
* Various sword aspect ratios
* Armor weight over time (armor became heavier to resist ballistic impact of early rifles)
* [Evolution of helmet shapes and subtypes](https://www.jstor.org/stable/pdf/3253956.pdf), see also [here](https://htmlpreview.github.io/?https://raw.githubusercontent.com/acdreyer/PGDV5200_MajorStudio1/master/Project_Qualitative/DeanBashFord.html)
* Evolution of various arms

Much of the research were from excellent resources found on JSTOR and other other MET publications,
primarily by the founder of Arms and Armor Department [Bashford Dean](https://www.jstor.org/stable/1652690).

Subsequently a similar approach was taken, but instead of focusing of branching one type of object (a helmet or dagger),
various items were placed on the same timeline as a Medieval Arms race. 

### Process
-------------------------

After cleaning the data and extracting subsets of helmet and weapon subtypes, 
a candidate list of 538 Object Numbers was condensed. This list, together with required field were stored in a .json file
with an array of objects of the following structure:

```  {
    "Object.ID": 23089,
    "Object.Name": "Sallet",
    "Culture": "Austrian, Innsbruck",
    "Object.Begin.Date": 1460,
    "Object.End.Date": 1520,
    "Medium": "Steel",
    "Dimensions": "D. of tail 7 1/2 in. (19.1 cm)",
    "Classification": "Helmets Parts",
    "Link.Resource": "http://www.metmuseum.org/art/collection/search/23089"
  }
  ```
  
Since the images did not form part of the MET CSV data, an additional process was 
required to do API calls to the MET in order to populate the filenames for download.
Sample code from the lab excercises was modified for this purpose.
The resulting structure was as follows:

```  {
    "objectID": 23089,
    "objectName": "Sallet",
    "culture": "Austrian, Innsbruck",
    "objectBeginDate": 1460,
    "objectEndDate": 1520,
    "dateAvg": 1490,
    "medium": "Steel",
    "dimensions": "D. of tail 7 1/2 in. (19.1 cm)",
    "affiliation": "other",
    "objectURL": "https://www.metmuseum.org/art/collection/search/23089",
    "primaryImage": "https://images.metmuseum.org/CRDImages/aa/original/29.150.5a_009AA2015.jpg",
    "filename": "29.150.5a_009AA2015.jpg",
    "primaryImageSmall": "https://images.metmuseum.org/CRDImages/aa/web-large/29.150.5a_009AA2015.jpg",
    "fnImageSmall": "29.150.5a_009AA2015.jpg",
    "additionalImages": [
      "https://images.metmuseum.org/CRDImages/aa/original/29.150.5a_003AA2015.jpg",
      "https://images.metmuseum.org/CRDImages/aa/original/29.150.5a_005AA2015.jpg",
      "https://images.metmuseum.org/CRDImages/aa/original/29.150.5a_006AA2015.jpg",
      "https://images.metmuseum.org/CRDImages/aa/original/29.150.5a_007AA2015.jpg"
    ]
  }
```

These data objects were then used to download the relevant images. Some issues were
found with API call rate limits and dropped downloads. This required additional splitting
of the JSON files, together with some minor manual downloading.

Images and .json files were subsequently used to parse and sort dates according 
to a specified interval of years. Some subjectivity was used to decide the
date range and object type to obtain a visual frame that is manageable, keeping
in mind the available data. Aesthetically the best density was found using 
quarter century increments from 1425 to 1775. initally 1200 to 1900 was used,
but the collection of items did not reflect these ranges optimally. 

Furthermore, helmets and poled weapons were found to be visually most interesting.
Swords and daggers were also deemed good candidates to include (based on Bashford Dean's original diagrams),
however the images for these items were often grayscale, or a combination of images zoomed into the hilt,
or images of the whole weapon. Subsequently only rapiers and flingtlock guns were included for additional context.

Cuirasses and breastplates would have been a nice addition, but the amount of these items at the MET 
ranged in a combination of other sets and/or did not lend itself to a bigger picture.
It is recommended to consider including data from the Royal Armories (Britain), since these
have a good collection of breastplates over time, even though weight data are sometimes not 
available for these (if weight was to be added).

The implimentation of the Narrative timeline was originally inspired by an 
[XKCD comic](https://xkcd.com/657/large/) and subsequently [implemented in D3 by Simon Alvery](https://source.opennews.org/articles/automating-xkcd-style-narrative-charts/).
The bulk of the work was to do sorting for a complex character interaction, with [code available on github](https://github.com/abcnews/d3-layout-narrative).

For the current implementation of the Evolution of Arms and Armor (medieval arms race),
images were coupled programatically using date ranges from the MET data ranges.
The character map used by the narrative layout chart was subsequently constructed using code in Node.js
and character interaction blocks ("scenes") constructed automatically. Image names were then also added and
from arrays of candidate images. Some manual selection was conducted in instances where images were aesthetically unpleasing.

The final result was obtained by D3 elements and styling using .html and CSS.
In future it is recommended to add a tooltip and/or links toward the items on the MET website, which contain all full resolution images of each item.


### Final Product
-------------------------

The final version can be found [here](https://htmlpreview.github.io/?https://github.com/acdreyer/PGDV5200_MajorStudio1/blob/master/Project_Qualitative/index.html) and is shown below.

[![Evolution of medieval foot soldier arms and armor](./images/FinalQualViz.PNG)](https://htmlpreview.github.io/?https://github.com/acdreyer/PGDV5200_MajorStudio1/blob/master/Project_Qualitative/index.html)
