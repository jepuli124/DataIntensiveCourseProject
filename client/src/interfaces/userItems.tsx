interface IUserItem extends Document{
    regionID: string,
    itemID: string,
    inventoryID: string,
    amount: number,
    itemName: string
}

export type { IUserItem }