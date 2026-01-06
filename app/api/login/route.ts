// NO PARAMETER AT ALL - Pure function
export async function POST() {
  try {
    // Global Request object
    const req = await fetch('http://localhost:3001/api/login-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'password123' })
    });
    
    const data = await req.json();
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
