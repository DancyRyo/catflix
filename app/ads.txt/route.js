export async function GET() {
    const content = 'google.com, pub-1085820487489265, DIRECT, f08c47fec0942fa0';

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
