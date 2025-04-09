export enum SeatType {
    VIP = "vip",
    STANDARD = "standard",
    DELUXE = "deluxe",
}

export const SeatPrice: Record<SeatType, number> = {
    [SeatType.STANDARD]: 50000,
    [SeatType.VIP]: 75000,
    [SeatType.DELUXE]: 100000
}