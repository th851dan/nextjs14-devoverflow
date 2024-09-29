import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const webhookData = await request.json(); // Holen der Daten aus der Anfrage

    try {
        // Verarbeite die Webhook-Daten hier
        console.log('Webhook-Daten empfangen:', webhookData);

        // Sende eine erfolgreiche Antwort zurück
        return NextResponse.json({ message: 'Webhook empfangen' }, { status: 200 });
    } catch (error) {
        console.error('Fehler beim Verarbeiten des Webhooks:', error);
        return NextResponse.json({ message: 'Interner Serverfehler' }, { status: 500 });
    }
}