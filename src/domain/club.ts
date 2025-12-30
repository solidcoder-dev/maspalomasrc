export type ClubDTO = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  sepaCreditorId: string;
  email: string;
  training: {
    schedule: string;
    location: string;
    mapsUrl: string;
  };
};

export class Club {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tagline: string,
    public readonly description: string,
    public readonly address: string,
    public readonly sepaCreditorId: string,
    public readonly email: string,
    public readonly training: ClubDTO["training"]
  ) {}

  static fromDTO(dto: ClubDTO): Club {
    return new Club(
      dto.id,
      dto.name,
      dto.tagline,
      dto.description,
      dto.address,
      dto.sepaCreditorId,
      dto.email,
      dto.training
    );
  }
}
