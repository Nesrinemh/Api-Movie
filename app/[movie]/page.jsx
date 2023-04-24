import Image from 'next/image';

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  console.log(res);
  return res.results.map((movie) => ({
    movie: toString(movie.id),
  }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = 'http://image.tmdb.org/t/p/original';
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 0 } }
  );

  const res = await data.json();
  return (
    <div>
      <div>
        <h2 className='text-2xl'>{res.title}</h2>
        <h2 className='text-lg'>{res.release_date}</h2>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2 className=' text-sm bg-green-600 inline-block my-2 py-2 px-4  rounded-md'>
          {res.status}
        </h2>
        <Image
          className='my-12 w-full'
          src={`http://image.tmdb.org/t/p/original${res.backdrop_path}
          `}
          width={600}
          height={600}
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}
