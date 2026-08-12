type TrainingMapViewProps = {
  location: string;
  mapsUrl: string;
};

const buildEmbedUrl = (location: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;

function TrainingMapView({ location, mapsUrl }: TrainingMapViewProps) {
  return (
    <div>
      <div className="ratio ratio-16x9 rounded-3 overflow-hidden border bg-body">
        <iframe
          src={buildEmbedUrl(location)}
          title="Mapa de entrenamientos"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a className="d-inline-block mt-2 small text-decoration-none" href={mapsUrl} target="_blank" rel="noreferrer">
        Abrir en Google Maps
      </a>
    </div>
  );
}

export default TrainingMapView;
