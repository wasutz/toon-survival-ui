const Stages =  {
    Pasued: 0,
    PreSale: 1,
    PublicSale: 2
}

const getStageName = (stage: number) => {
    switch (stage) {
        case Stages.Pasued:
            return "Paused";
        case Stages.PreSale:
            return "Pre Sale";
        case Stages.PublicSale:
            return "Public Sale";
        default:
            return '';
    }
}

export {Stages, getStageName};