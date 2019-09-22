## MET Data visualization

This project is for the Quantitative Visualization assignment.

The MET CSV data was processed with R. Collection classification occurences were
extracted using the R text mining library. Word frequencies were counted
and stored as a separate .CSV file as number of occurences.
Common stopphrases and punctuation was omitted from the counts.
Occurences lower than 100 was ommitted.

A stacked bar chart was then generated. This aims to keep overall context
of the dataset by optimizing packing space into the empty graph area.
A normal bar chart could also be used, however, the long tail in the dataset 
makes comparison difficult. 
The stacked bar chart respresentation of the word occurence count therefore
focuses attention on most occuring words, while placing their occurance into context.
 



