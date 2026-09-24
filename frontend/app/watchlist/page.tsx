import { MovieList } from './_components/MovieList'

const MovieHome = async ({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) => {
  const { page } = await searchParams; // ✅ Correct

  const pageNumber = Number(page) || 1;

  return (
    <div className='bg-zinc-900 w-full h-full'>
      <MovieList page={pageNumber} />
    </div>
  )
}

export default MovieHome