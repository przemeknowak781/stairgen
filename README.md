# Stairgen

Interaktywny konfigurator schodów kręconych — pełne stopnie z podniebieniem — eksport do GLB.

## Funkcje

- **65+ parametrów** — wymiary, liczba stopni, nos (square/rounded/chamfer), 3 tryby podniebienia (stepped / smooth_helix / offset_slab), słup centralny (solid/tube + kapy + podstawy), spocznik (ćwiartka/pół/kwadrat), balustrada (tralki pionowe/poziome/szkło/linki/panele), pochwyt helikoidalny, materiały PBR per element
- **Walidacja live** — 7 reguł PL Warunki Techniczne × 3 profile budynku (mieszkanie / publiczny / pomocnicze)
- **5 presetów** — Mieszkanie beton Ø140, Mieszkanie drewno Ø160, Loft metal Ø120, Publiczny beton Ø180, Premium marmur Ø150
- **Eksport GLB** — pełna geometria + materiały PBR, metadata konfiguracji w `asset.extras.stairgenConfig`
- **Sceneria** — 5 presetów HDRI (studio / showroom / interior_warm / interior_cool / dusk), kontaktowe cienie, 5 presetów kamery (hero / top / elevation / detail_nosing / underside)

## Start

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 62 testy jednostkowe
npm run build      # produkcyjny bundle do dist/
```

## Stack

Vite 8 · React 19 · TypeScript 5 (strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes)
· three 0.183 · @react-three/fiber · @react-three/drei · three-stdlib
· zustand · leva · vitest

## Struktura

```
src/
├── config/       types, defaults, computed metrics, validators (WT), 5 presets
├── geometry/     builders: step (z profile sweep), soffit (3 tryby), column, balustrade, rail (helikoida), landing, materials
├── scene/        R3F components: Stair composition, Environment (HDRI), Camera rig, ExportListener
├── ui/           Topbar, ControlPanel (leva), ValidationPanel, StatusBar, PresetPicker, ExportButton
├── export/       exportSceneToGLB (GLTFExporter + custom extras injection)
└── store/        useStairStore (zustand, update/applyPreset/reset)
```

Dokumentacja: `docs/plans/2026-04-15-spiral-stair-configurator-design.md` (decyzje projektowe), `docs/qa-checklist.md` (QA gate).

## Eksport GLB

Kliknij **Export GLB ⬇** w topbarze. Plik `stairgen_<timestamp>.glb` zostanie pobrany do domyślnego katalogu pobierania.

Model jest skalowany w metrach (współczynnik 0.001 vs. mm w-aplikacji). Materiały: `MeshStandardMaterial` → standard glTF PBR. Konfiguracja zapisana jako JSON w `asset.extras.stairgenConfig` — można odtworzyć identyczny projekt.

Weryfikacja: https://gltf-viewer.donmccurdy.com/

## Zgodność (PL Warunki Techniczne)

Walidator sprawdza:

| Reguła | Mieszkanie (§68) | Publiczny | Pomocnicze |
|---|---|---|---|
| rise max | 190 mm | 175 mm | 220 mm |
| walkline depth min | 250 mm | 300 mm | 200 mm |
| szerokość użytkowa min | 800 mm | 1200 mm | 600 mm |
| wysokość pochwytu min | 900 mm | 1100 mm | 900 mm |
| rozstaw tralek max | 120 mm | 120 mm | 200 mm |
| Blondel (2h+s) | 600–650 | 600–650 | info |
| kąt stopnia max | 30° | 30° | 45° |

Wyniki live w prawym panelu, kolorowanie wg severity.

## Roadmap (v2)

- PBR texture maps (drewno/beton/marmur) + `textureScale`
- Draco kompresja eksportu
- PNG screenshot
- Import konfiguracji JSON drag&drop
- Wiele biegów / winder / spoczniki między biegami
- Eksport 2D (rzut + przekrój) SVG z wymiarami
- Profil dostępności (PWD)
- Animacja „unfold" do prezentacji

## Licencja

UNLICENSED (prywatny projekt).
