
# This script is for wrangling the MET Museum CSV data
# 
# Created by A.C. Dreyer for PGDV5200 Major Stutio 1
# 09-16-2019
# 
# The script reads the MET data and does text mining on the "Medium" and "Classification"
# fields in order to get a list of words that can be categorized and plotted.

# -------------------------
# Required Packages
# install.packages("tm") #for text mining
# install.packages("SnowballC") #for text stemming
# install.packages("wordcloud") # word-cloud generator
# install.packages("RColorBrewer") #color palletes
# library("tm") #for text mining
# library("SnowballC") #for text stemming
# library("wordcloud") # word-cloud generator
# library("RColorBrewer") #color palletes
# library("ggplot2")
# library("Hmisc")
# -------------------------



# # Read the CSV file
# metobjects = read.csv("MetObjects.txt")
# length(metobjects$Title)

# # Write relevant tables as text files
# write.table(metobjects$Medium,"medium.txt",sep="\n",quote = FALSE,row.names=FALSE)
# write.table(metobjects$Classification,"classification.txt",sep="\n",quote = FALSE,row.names=FALSE)





## Text mining:

# Remove punctuation and stopwords junk
mediumRawText = gsub("[[:punct:]]", " ", readLines("medium.txt"))
classifRawText = gsub("[[:punct:]]", " ",readLines("classification.txt"))

ctrl = list(removePunctuation = list(preserve_intra_word_dashes = FALSE,
                              removePunctuation=FALSE,
                              removeNumbers = TRUE),
     # stopwords("en"), 
     stopwords= c("on", "and","(a)","(b)","(c)","(d)","(e)","(f)"
     ,"(g)","(h)","(i)","(j)","(k)","(l)","(m)","(n)"
     ,"(o)","(p)","(q)","(r)","(q)","(r)","(s)","(t)","(u)","(v)"
     ,"(w)","(x)","(y)","(z)","|"," "
     ," a)"," b)"," c)"," d)"," e)"," f)"
     ," g)"," h)"," i)"," j)"," k)"," l)"," m)"," n)"
     ," o)"," p)"," q)"," r)"," q)"," r)"," s)"," t)"," u)"," v)"
     ," w)"," x)"," y)"," z)"
     ,"with","of","state","black","brown","cut","blow"
     ,"hole","sets","single","main","or","in","for","ã"
     ,"etc","not assigned","from","two","a","no","the","off","an","as"
     ,"by","de","cm","sec","un","100","wth","upon","ia","et","eâ€“g"),
     wordLengths = c(3, Inf))

# Do the text mining word frequency count for each data field/text file
mediumCount = sort(termFreq(mediumRawText, ctrl),decreasing = TRUE)
classifCount = sort(termFreq(classifRawText, ctrl),decreasing = TRUE)


# Specify minimum cutoff number of word occurences for each file/field
nfiltMedium  = 1000;
nfiltClassif = 1000;


# Keep only high number of occurences
mediumCount <- mediumCount[ mediumCount >= nfiltMedium ]
classifCount <- classifCount[ classifCount >= nfiltClassif ]

# Write the filtered variables to text files for future use
fNameMedium = paste("classifCount_",toString(nfiltMedium),".txt",sep="")
fNameClassif = paste("mediumCount_",toString(nfiltClassif),".txt",sep="")
write.table(mediumCount,fNameMedium,sep="\t",quote = FALSE)
write.table(classifCount,fNameClassif,sep="\t",quote = FALSE)

# ------------------------- Do the Plotting

# Specify plot theme
newtheme <- theme(plot.title = element_text(family = "Helvetica", face = "bold", size = (10),colour="steelblue4",hjust = 0.5), 
                      legend.title = element_text(colour = "steelblue",  face = "bold.italic", family = "Helvetica"), 
                      legend.text = element_text(face = "italic", colour="steelblue4",family = "Helvetica"), 
                      axis.title = element_text(family = "Helvetica", size = (10), colour = "steelblue4"),
                      axis.text = element_text(family = "Courier", colour = "cornflowerblue", size = (10))
                      # ,axis.text.x = element_text(angle = 90, hjust = 1)
                  )


# Plot a dataset and save the plot to file
x = c(1:length(mediumCount))
# x=(names(mediumCount))
df <- data.frame(x, mediumCount)
head(df)
# mediumplot<-ggplot(data=df, aes(x=reorder(x,-mediumCount), y=mediumCount,label=names(mediumCount))) +  geom_bar(stat="identity")
mediumplot<-ggplot(data=df, aes(x=x, y=mediumCount)) +  geom_bar(stat="identity")
mediumplot
print(mediumplot + newtheme + ggtitle("Media Type Occurences") + labs(y="Number of occurences", x = "MET Collection Medium (Material) words"))
plotFname = paste("Media_hist_",toString(nfiltMedium),".png",sep="")
ggsave(plotFname)



# classifCount.labels = names(classifCount)


# Plot a dataset and save the plot to file
x = c(1:length(classifCount))
# x = names(classifCount)
df <- data.frame(x, classifCount)
head(df)
# classifplot<-ggplot(data=df, aes(x=reorder(x,-classifCount), y=classifCount )) +  geom_bar(stat="identity") 
classifplot<-ggplot(data=df, aes(x=x, y=classifCount )) +  geom_bar(stat="identity") 
classifplot
print(classifplot + newtheme + ggtitle("Classification Type Occurences") + labs(y="Number of occurences", x = "MET Classification words"))
plotFname = paste("Classif_hist_",toString(nfiltClassif),".png",sep="")
ggsave(plotFname)




