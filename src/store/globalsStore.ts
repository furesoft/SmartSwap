import Globals from "@/models/Globals";

export async function saveGlobalsToBlob(obj: Globals): Promise<void> {
  await fetch('/api/globals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  });
}

export async function loadGloalsFromBlob(): Promise<Globals | null> {
  const res = await fetch('/api/globals');
  if (!res.ok) return null;
  const data = await res.json();
  return data ?? {};
}
