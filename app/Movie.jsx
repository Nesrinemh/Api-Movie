import Image from 'next/image';
import Link from 'next/link';

export default function Movie({
  title,
  id,
  poster_path,
  release_date,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{release_date}</h2>
      <Link href={`/${id}`}>
        <Image
          src={`http://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          width={800}
          height={800}
        />
      </Link>
    </div>
  );
}
