export async function saveMessageToBlob(message: string): Promise<boolean> {
  const res = await fetch('/api/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
}

export async function loadMessageFromBlob(): Promise<string | null> {
  const res = await fetch('/api/message');
  if (!res.ok) return null;
  const data = await res.json();
  return data.message ?? null;
}
