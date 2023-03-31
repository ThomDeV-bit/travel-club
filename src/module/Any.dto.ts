import internal from "stream"

export type userDTO = {
    id_user?: number
    user_name : string
    password : string
}


export type travelerDTO = {
    id_traveler? : number
    image_link : string
    image? : Blob
    user : number
    contact : number
}