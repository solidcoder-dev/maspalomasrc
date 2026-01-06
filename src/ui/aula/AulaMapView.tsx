type AulaMapViewProps = {
  mapsUrl: string;
  location: string;
};

const buildEmbedUrl = (location: string) => {
  const query = encodeURIComponent(location);
  return `https://www.google.com/maps?q=${query}&output=embed`;
};

function AulaMapView({ mapsUrl, location }: AulaMapViewProps) {
  const embedUrl = buildEmbedUrl(location);
  return (
    <div>
      <div className="ratio ratio-16x9 rounded-3 overflow-hidden border bg-body">
        <iframe
          src={embedUrl}
          title="Mapa de entrenamientos"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        className="d-inline-block mt-2 small text-decoration-none"
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Abrir en Google Maps
      </a>
    </div>
  );
}

export default AulaMapView;
