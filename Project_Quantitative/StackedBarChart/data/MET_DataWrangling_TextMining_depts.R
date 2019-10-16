
# This script is for wrangling the MET Museum CSV data
# 

# 
# by A.C. Dreyer for PGDV5200 Major Stutio 1
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
# install.packages("ggthemes") 

# Create# 
library("ggplot2")
library("Hmisc")
library("tm") #for text mining
library("SnowballC") #for text stemming
library("wordcloud") # word-cloud generator
library("RColorBrewer") #color palletes
library("ggthemes") 
# -------------------------



# # Read the MET CSV file
metobjects = read.csv("MetObjects.txt")
length(metobjects$Title)

# # Write out the relevant tables as text files (raw)
# This might be useful for processing the whole collection....
write.table(metobjects$Medium,"raw_Medium.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Classification,"raw_Classification.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Country,"raw_Country.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Culture,"raw_Culture.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Object.Name,"raw_ObjectName.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Title,"raw_Title.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Tags,"raw_Tags.txt",sep="\n",quote = FALSE,row.names=FALSE)


# Create a data frame with only the relevant columns
df = metobjects[c("Object.ID","Department","Object.Name","Title","Culture","Object.Begin.Date"
                  ,"Object.End.Date","Medium","Country","Classification","Tags")]

# Save these as a text file
write.table(df,"raw_selectedColumns.txt")

# df_deptAmercDecArts = subset(df,Department == "American Decorative Arts")
# df_deptAncNrEastArt = subset(df,Department == "Ancient Near Eastern Art")
# df_deptArmsAndArmor = subset(df,Department == "Arms and Armor")
# df_deptArtsAfrOcnAm = subset(df,Department == "Arts of Africa, Oceania, and the Americas")
# df_deptAsianArt = subset(df,Department == "Asian Art")
# df_deptCostumeInst = subset(df,Department == "Costume Institute")
# df_deptDrwgsPrints = subset(df,Department == "Drawings and Prints")
# df_deptEgyptianArt = subset(df,Department == "Egyptian Art")
# df_deptEuropeanPaint = subset(df,Department == "European Paintings")
# df_deptEuropeanSculp = subset(df,Department == "European Sculpture and Decorative Arts")
# df_deptGreekRomanArt = subset(df,Department == "Greek and Roman Art")
# df_deptIslamicArt = subset(df,Department == "Islamic Art")
# df_deptMedievalArt = subset(df,Department == "Medieval Art")
# df_deptModernContArt = subset(df,Department == "Modern and Contemporary Art")
# df_deptMusicalInst = subset(df,Department == "Musical Instruments")
# df_deptPhotographs = subset(df,Department == "Photographs")
# df_deptRobLehmanCol = subset(df,Department == "Robert Lehman Collection")
# df_deptTheCloisters = subset(df,Department == "The Cloisters")
# df_deptTheLibraries = subset(df,Department == "The Libraries")
# summary(df_deptAncNrEastArt)






# Add all the departments to a list of data frames
# Yea I know it is dirty...but hopefully next time I'll find a better way to do it...
mylist <- list()
mylist[[1]] = subset(df,Department == "American Decorative Arts")
mylist[[2]] = subset(df,Department == "Ancient Near Eastern Art")
mylist[[3]] = subset(df,Department == "Arms and Armor")
mylist[[4]] = subset(df,Department == "Arts of Africa, Oceania, and the Americas")
mylist[[5]] = subset(df,Department == "Asian Art")
mylist[[6]] = subset(df,Department == "Costume Institute")
mylist[[7]] = subset(df,Department == "Drawings and Prints")
mylist[[8]] = subset(df,Department == "Egyptian Art")
mylist[[9]] = subset(df,Department == "European Paintings")
mylist[[10]] = subset(df,Department == "European Sculpture and Decorative Arts")
mylist[[11]] = subset(df,Department == "Greek and Roman Art")
mylist[[12]] = subset(df,Department == "Islamic Art")
mylist[[13]] = subset(df,Department == "Medieval Art")
mylist[[14]] = subset(df,Department == "Modern and Contemporary Art")
mylist[[15]] = subset(df,Department == "Musical Instruments")
mylist[[16]] = subset(df,Department == "Photographs")
mylist[[17]] = subset(df,Department == "Robert Lehman Collection")
mylist[[18]] = subset(df,Department == "The Cloisters")
mylist[[19]] = subset(df,Department == "The Libraries")

# listdepartments <- list()
listdepartments[1] = "American Decorative Arts"
listdepartments[2] = "Ancient Near Eastern Art"
listdepartments[3] = "Arms and Armor"
listdepartments[4] = "Arts of Africa, Oceania, and the Americas"
listdepartments[5] = "Asian Art"
listdepartments[6] = "Costume Institute"
listdepartments[7] = "Drawings and Prints"
listdepartments[8] = "Egyptian Art"
listdepartments[9] = "European Paintings"
listdepartments[10] = "European Sculpture and Decorative Arts"
listdepartments[11] = "Greek and Roman Art"
listdepartments[12] = "Islamic Art"
listdepartments[13] = "Medieval Art"
listdepartments[14] = "Modern and Contemporary Art"
listdepartments[15] = "Musical Instruments"
listdepartments[16] = "Photographs"
listdepartments[17] = "Robert Lehman Collection"
listdepartments[18] = "The Cloisters"
listdepartments[19] = "The Libraries"

# Write each of the departments out to a text file so that it can be parsed by other software
# Also write out the summary of each to get an idea of what we're dealing with.
# This might have to become a .csv...
# Names
lapply(seq_along(mylist),function(i){
write.table(mylist[[i]]$Object.Name,paste("ObjectNameEachDept",toString(i),".txt"),sep="\n",quote = FALSE,row.names=FALSE)
write.table(summary(sort(mylist[[i]]$Object.Name),decreasing = TRUE),paste("ObjectNameSummaryDept",toString(i),".txt"),sep="\t",quote = FALSE)
        })
# Titles
lapply(seq_along(mylist),function(i){
write.table(mylist[[i]]$Title,paste("TitleEachDept",toString(i),".txt"),sep="\n",quote = FALSE,row.names=FALSE)
write.table(summary(sort(mylist[[i]]$Title),decreasing = TRUE),paste("TitleSummaryDept",toString(i),".txt"),sep="\t",quote = FALSE)
        })
# Cultures
lapply(seq_along(mylist),function(i){
write.table(mylist[[i]]$Culture,paste("CultureEachDept",toString(i),".txt"),sep="\n",quote = FALSE,row.names=FALSE)
write.table(summary(sort(mylist[[i]]$Culture),decreasing = TRUE),paste("CultureSummaryDept",toString(i),".txt"),sep="\t",quote = FALSE)
        })

# Mediums
lapply(seq_along(mylist),function(i){
write.table(mylist[[i]]$Medium,paste("MediumEachDept",toString(i),".txt"),sep="\n",quote = FALSE,row.names=FALSE)
write.table(summary(sort(mylist[[i]]$Medium),decreasing = TRUE),paste("MediumSummaryDept",toString(i),".txt"),sep="\t",quote = FALSE)
        })

# Countries
lapply(seq_along(mylist),function(i){
write.table(mylist[[i]]$Country,paste("CountryEachDept",toString(i),".txt"),sep="\n",quote = FALSE,row.names=FALSE)
write.table(summary(sort(mylist[[i]]$Country),decreasing = TRUE),paste("CountrySummaryDept",toString(i),".txt"),sep="\t",quote = FALSE)
        })

# Classifications
lapply(seq_along(mylist),function(i){
write.table(mylist[[i]]$Classification,paste("ClassificationEachDept",toString(i),".txt"),sep="\n",quote = FALSE,row.names=FALSE)
write.table(summary(sort(mylist[[i]]$Classification),decreasing = TRUE),paste("ClassificationSummaryDept",toString(i),".txt"),sep="\t",quote = FALSE)
        })

# Tags
lapply(seq_along(mylist),function(i){
write.table(mylist[[i]]$Tags,paste("TagsEachDept",toString(i),".txt"),sep="\n",quote = FALSE,row.names=FALSE)
write.table(summary(sort(mylist[[i]]$Tags),decreasing = TRUE),paste("TagsSummaryDept",toString(i),".txt"),sep="\t",quote = FALSE)
        })




# Check to see if the summaries are useful; by plotting bar charts of each
# i.e. check if the collection is very skewed or not...
# Also: if there are too many (others) it means that additional text counting is needed...

# sumtheme <- theme(plot.title = element_text(family = "Helvetica", face = "bold", size = (8),colour="black",hjust = 0.5), 
#                   legend.title = element_text(colour = "Black",  face = "bold.italic", family = "Helvetica"), 
#                   legend.text = element_text(face = "italic", colour="steelblue4",family = "Helvetica"), 
#                   axis.title = element_text(family = "Helvetica", size = (6), colour = "black"),
#                   # axis.text = element_text(family = "Courier", colour = "black", size = (6)),
#                   axis.text.x = element_text(color = "black", size = 8, angle = 0, hjust = .5, vjust = .5, face = "plain"),
#                   axis.text.y = element_text(color = "black", size = 8, angle = 0,  vjust = 0, face = "plain")
#                   # axis.title.x = element_text(color = "black", size = 12, angle = 0, hjust = .5, vjust = 0, face = "plain"),
#                   # axis.title.y = element_text(color = "black", size = 8, angle = 90, hjust = .5, vjust = 0, face = "plain")
# )
sumtheme<-theme_set(theme_bw())

par(mar=c(1,1,1,1))   # margin

# Names
for (i in 1:19){
        number = i
        # dddfff <- data.frame(summary((mylist[[number]]$Object.Name)))
        ddff <- data.frame(summary((mylist[[number]]$Object.Name)))
        dddfff <- ddff[c(1:25),,drop=FALSE]
        # ggplot(dddfff, aes(x = rownames(dddfff), y=dddfff$summary..mylist..13...Tags..)) + 
        ggplot(dddfff, aes(x = reorder(rownames(dddfff),dddfff$summary..mylist..number...Object.Name..)
                           , y=dddfff$summary..mylist..number...Object.Name..)) + 
                geom_bar(stat = "identity", fill = "lavender") +
                # geom_text(aes(label = rownames(dddfff)), hjust = -0.2) +
                coord_flip() +
                # ggtitle(paste("Coll.Names, Department ",toString(number),";",listdepartments[i],sep="")) +
                ggtitle(paste("Coll. Names in ",listdepartments[i],sep="")) +
                labs(x = "", y = "Occurences") +
                scale_y_continuous(limits = c(0, 5000))+
                sumtheme
                # scale_x_discrete(labels = abbreviate)
                # theme_bw
                # theme_minimal
        plotFname = paste("SummaryNames",toString(number),".png",sep="")
        ggsave(plotFname)
}

# Titles
for (i in 1:19){
        number = i
        ddff <- data.frame(summary((mylist[[number]]$Title)))
        dddfff <- ddff[c(1:25),,drop=FALSE]
        # ggplot(dddfff, aes(x = rownames(dddfff), y=dddfff$summary..mylist..13...Tags..)) + 
        ggplot(dddfff, aes(x = reorder(rownames(dddfff),dddfff$summary..mylist..number...Title..)
                           , y=dddfff$summary..mylist..number...Title..)) + 
                geom_bar(stat = "identity", fill = "lavender") +
                # geom_text(aes(label = rownames(dddfff)), hjust = -0.2) +
                coord_flip() +
                ggtitle(paste("Coll. Titles in ",listdepartments[i],sep="")) +
                labs(x = "", y = "Occurences") +
                theme_bw()
        plotFname = paste("SummaryTitles",toString(number),".png",sep="")
        ggsave(plotFname)
}
# Cultures
for (i in 1:19){
        number = i
        ddff <- data.frame(summary((mylist[[number]]$Culture)))
        dddfff <- ddff[c(1:25),,drop=FALSE]
        # ggplot(dddfff, aes(x = rownames(dddfff), y=dddfff$summary..mylist..13...Tags..)) + 
        ggplot(dddfff, aes(x = reorder(rownames(dddfff),dddfff$summary..mylist..number...Culture..)
                           , y=dddfff$summary..mylist..number...Culture..)) + 
                geom_bar(stat = "identity", fill = "lavender") +
                # geom_text(aes(label = rownames(dddfff)), hjust = -0.2) +
                coord_flip() +
                ggtitle(paste("Coll. Cultures in ",listdepartments[i],sep="")) +
                labs(x = "", y = "Occurences") +
                theme_bw()
        plotFname = paste("SummaryCultures",toString(number),".png",sep="")
        ggsave(plotFname)
}
# Mediums
for (i in 1:19){
        number = i
        ddff <- data.frame(summary((mylist[[number]]$Medium)))
        dddfff <- ddff[c(1:25),,drop=FALSE]
        # ggplot(dddfff, aes(x = rownames(dddfff), y=dddfff$summary..mylist..13...Tags..)) + 
        ggplot(dddfff, aes(x = reorder(rownames(dddfff),dddfff$summary..mylist..number...Medium..)
                           , y=dddfff$summary..mylist..number...Medium..)) + 
                geom_bar(stat = "identity", fill = "lavender") +
                # geom_text(aes(label = rownames(dddfff)), hjust = -0.2) +
                coord_flip() +
                ggtitle(paste("Coll. Medium in ",listdepartments[i],sep="")) +
                labs(x = "", y = "Occurences") +
                theme_bw()
        plotFname = paste("SummaryMedium",toString(number),".png",sep="")
        ggsave(plotFname)
}
# Countries
for (i in 1:19){
        number = i
        ddff <- data.frame(summary((mylist[[number]]$Country)))
        dddfff <- ddff[c(1:25),,drop=FALSE]
        # ggplot(dddfff, aes(x = rownames(dddfff), y=dddfff$summary..mylist..13...Tags..)) + 
        ggplot(dddfff, aes(x = reorder(rownames(dddfff),dddfff$summary..mylist..number...Country..)
                           , y=dddfff$summary..mylist..number...Country..)) + 
                geom_bar(stat = "identity", fill = "lavender") +
                # geom_text(aes(label = rownames(dddfff)), hjust = -0.2) +
                coord_flip() +
                ggtitle(paste("Coll. Country in ",listdepartments[i],sep="")) +
                labs(x = "", y = "Occurences") +
                theme_bw()
        plotFname = paste("SummaryCountry",toString(number),".png",sep="")
        ggsave(plotFname)
}
# Classifications
for (i in 1:19){
        number = i
        ddff <- data.frame(summary((mylist[[number]]$Classification)))
        dddfff <- ddff[c(1:25),,drop=FALSE]
        # ggplot(dddfff, aes(x = rownames(dddfff), y=dddfff$summary..mylist..13...Tags..)) + 
        ggplot(dddfff, aes(x = reorder(rownames(dddfff),dddfff$summary..mylist..number...Classification..)
                           , y=dddfff$summary..mylist..number...Classification..)) + 
                geom_bar(stat = "identity", fill = "lavender") +
                # geom_text(aes(label = rownames(dddfff)), hjust = -0.2) +
                coord_flip() +
                ggtitle(paste("Classification in ",listdepartments[i],sep="")) +
                labs(x = "", y = "Occurences") +
                theme_bw()
        plotFname = paste("SummaryClassification",toString(number),".png",sep="")
        ggsave(plotFname)
}
# Tags
for (i in 1:19){
        number = i
        ddff <- data.frame(summary((mylist[[number]]$Tags)))
        dddfff <- ddff[c(1:25),,drop=FALSE]
        # ggplot(dddfff, aes(x = rownames(dddfff), y=dddfff$summary..mylist..13...Tags..)) + 
        ggplot(dddfff, aes(x = reorder(rownames(dddfff),dddfff$summary..mylist..number...Tags..)
                           , y=dddfff$summary..mylist..number...Tags..)) + 
                # geom_text(aes(label = rownames(dddfff)), hjust = -0.2) +
                coord_flip() +
                ggtitle(paste("Tags in ",listdepartments[i],sep="")) +
                labs(x = "", y = "Attempts") +
                theme_bw()
        plotFname = paste("SummaryTags",toString(number),".png",sep="")
        ggsave(plotFname)
}



# View(df_deptAmercDecArts)
## Text mining:
write.table(metobjects$Medium,"raw_Medium.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Classification,"raw_Classification.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Country,"raw_Country.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Culture,"raw_Culture.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Object.Name,"raw_ObjectName.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Title,"raw_Title.txt",sep="\n",quote = FALSE,row.names=FALSE)
write.table(metobjects$Tags,"raw_Tags.txt",sep="\n",quote = FALSE,row.names=FALSE)

# Remove punctuation and stopwords junk
# mediumRawText = gsub("[[:punct:]]", " ", readLines("medium.txt"))
# classifRawText = gsub("[[:punct:]]", " ",readLines("classification.txt"))


mediumRawText = gsub("[[:punct:]]", " ", readLines("raw_Medium.txt"))
classifRawText = gsub("[[:punct:]]", " ",readLines("raw_Classification.txt"))
namesRawText = gsub("[[:punct:]]", " ",readLines("raw_ObjectName.txt"))
cultureRawText = gsub("[[:punct:]]", " ",readLines("raw_Culture.txt"))
tagsRawText = gsub("[[:punct:]]", " ",readLines("raw_Tags.txt"))
countryRawText = gsub("[[:punct:]]", " ",readLines("raw_Country.txt"))



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
namesCount = sort(termFreq(namesRawText, ctrl),decreasing = TRUE)
cultureCount = sort(termFreq(cultureRawText, ctrl),decreasing = TRUE)
tagsCount = sort(termFreq(tagsRawText, ctrl),decreasing = TRUE)
countryCount = sort(termFreq(countryRawText, ctrl),decreasing = TRUE)

# Specify minimum cutoff number of word occurences for each file/field
nfiltMedium  = 1;
nfiltClassif = 1;
nfiltNames = 1;
nfiltCultures = 1;
nfiltTags = 1;
nfiltCountry = 1;


# Keep only high number of occurences
mediumCount <- mediumCount[ mediumCount >= nfiltMedium ]
classifCount <- classifCount[ classifCount >= nfiltClassif ]
namesCount <- namesCount[ namesCount >= nfiltNames ]
cultureCount <- cultureCount[ cultureCount >= nfiltCultures ]
tagsCount <- tagsCount[ tagsCount >= nfiltTags ]
countryCount <- countryCount[ countryCount >= nfiltCountry ]

# Write the filtered variables to text files for future use
fNameMedium = paste("Count_medium_",toString(nfiltMedium),".csv",sep="")
fNameClassif = paste("Count_classif_",toString(nfiltClassif),".csv",sep="")
fNameNames = paste("Count_names_",toString(nfiltNames),".csv",sep="")
fNameCultures = paste("Count_cultures_",toString(nfiltCultures),".csv",sep="")
fNameTags = paste("Count_tags_",toString(nfiltTags),".csv",sep="")
fNameCountry = paste("Count_country_",toString(nfiltCountry),".csv",sep="")


write.table(mediumCount,fNameMedium,sep=",",quote = FALSE,col.names = 'Medium,Occurences')
write.table(classifCount,fNameClassif,sep=",",quote = FALSE,col.names = 'Classification,Occurences')
write.table(namesCount,fNameNames,sep=",",quote = FALSE,col.names = 'Name,Occurences')
write.table(cultureCount,fNameCultures,sep=",",quote = FALSE,col.names = 'Culture,Occurences')
write.table(tagsCount,fNameTags,sep=",",quote = FALSE,col.names = 'Tags,Occurences')
write.table(countryCount,fNameCountry,sep=",",quote = FALSE,col.names = 'Country,Occurences')














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




