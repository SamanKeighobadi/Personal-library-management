import api from '@/apis/Api'
import type { IBookResponse } from '@/types/book.types'

export const getAllBooks = async () =>{
    return await api.get<IBookResponse[]>("/books")
}

export const getBookByID = async (bookID:number) =>{
    return await api.get<IBookResponse>(`/books/${bookID}`)
}

