export type AulaDTO = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  partnership: {
    title: string;
    description: string;
  };
  trainings: {
    schedule: string;
    location: string;
    mapsUrl: string;
  };
  approach: {
    title: string;
    points: string[];
  };
};

export class AulaInfo {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly subtitle: string,
    public readonly description: string,
    public readonly partnership: AulaDTO["partnership"],
    public readonly trainings: AulaDTO["trainings"],
    public readonly approach: AulaDTO["approach"]
  ) {}

  static fromDTO(dto: AulaDTO): AulaInfo {
    return new AulaInfo(
      dto.id,
      dto.title,
      dto.subtitle,
      dto.description,
      dto.partnership,
      dto.trainings,
      dto.approach
    );
  }
}
