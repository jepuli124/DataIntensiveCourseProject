interface IUser extends Document{
    userID: string
    regionID: string
    passwordHash: string
    username: string
    inventoryID: string
}

export default IUser