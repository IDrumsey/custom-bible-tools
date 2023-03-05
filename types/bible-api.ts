// based on the models here - https://scripture.api.bible/livedocs#/
export type Meta = {
    fums: string
    fumsId: string
    fumsJsInclude: string
    fumsJs: string
    fumsNoScript: string
}




export type Language = {
    id: string
    name: string
    nameLocal: string
    script: string
    scriptDirection: string
}




export type AudioBibleSummary = {
    id: string
    name: string
    nameLocal: string
    description: string
    descriptionLocal: string
}


export type BibleSummary = {
    id: string
    dblId: string
    abbreviation: string
    abbreviationLocal: string
    language: Language
    countries: {
        id: string
        name: string
        nameLocal: string
    }[]
    name: string
    nameLocal: string
    description: string
    descriptionLocal: string
    relatedDbl: string
    type: string
    updatedAt: string
    audioBibles: AudioBibleSummary[]
}





export type Bible = {
    id: string
    dblId: string
    abbreviation: string
    abbreviationLocal: string
    copyright: string
    language: Language
    countries: {
        id: string
        name: string
        nameLocal: string
    }[]
    name: string
    nameLocal: string
    description: string
    descriptionLocal: string
    info: string
    type: string
    updatedAt: string
    relatedDbl: string
    audioBibles: AudioBibleSummary[]
}




export type Book = {
    id: string
    bibleId: string
    abbreviation: string
    name: string
    nameLong: string
    chapters: ChapterSummary[]
}



export type ChapterSummary = {
    id: string
    bibleId: string
    number: string
    bookId: string
    reference: string
}




export type Chapter = {
    id: string
    bibleId: string
    number: string
    bookId: string
    content: string
    reference: string
    verseCount: number
    next: {
        id: string
        bookId: string
        number: string
    }
    previous: {
        id: string
        bookId: string
        number: string
    }
    copyright: string
}




export type Passage = {
    id: string
    bibleId: string
    orgId: string
    content: string
    reference: string
    verseCount: number
    copyright: string
}





export type Verse = {
    id: string
    orgId: string
    bibleId: string
    bookId: string
    chapterId: string
    content: string
    reference: string
    verseCount: number
    copyright: string
    next: {
        id: string
        bookId: string
    }
    previous: {
        id: string
        bookId: string
    }
}




export type SectionSummary = {
    id: string
    bibleId: string
    bookId: string
    title: string
    firstVerseId: string
    lastVerseId: string
    firstVerseOrgId: string
    lastVerseOrgId: string
}
