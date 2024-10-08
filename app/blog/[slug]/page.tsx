// This will make nextjs not to cache the page.
export const dynamic = 'force-dynamic';

// revalidate allows to update the page after some time interval.
//export const revalidate = 100;

interface Post {
    title: string;
    content: string;
    slug: string;
}

interface Props {
    params: { slug: string };
}

export default async function BlogPostPage ({ params } : Props) {
    const posts : Post[] = await fetch(
        "http://localhost:3000/api/content",
        {'cache': "no-cache"}
    ).then(res => res.json());

    const post = posts.find(post => post.slug === params.slug);

    return (
        <div>
            <h1>{post?.title}</h1>
            <p>{post?.content}</p>
        </div>
    );
}