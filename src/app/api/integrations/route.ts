import { NextRequest, NextResponse } from 'next/server'
import { getIntegrations, toggleIntegration } from '@/lib/mock/integrations'

export async function GET() {
  const integrations = getIntegrations()
  return NextResponse.json({ integrations })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action } = body

    if (!id || !action || !['connect', 'disconnect'].includes(action)) {
      return NextResponse.json(
        { error: 'Action invalide' },
        { status: 400 }
      )
    }

    const updated = toggleIntegration(id, action === 'connect')
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Intégration non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, integration: updated })
  } catch {
    return NextResponse.json(
      { error: 'Requête invalide' },
      { status: 400 }
    )
  }
}
