import { useLoaderData, useSearchParams } from "react-router-dom";

type Province = {
  id: number;
  name: string;
};

type Regency = {
  id: number;
  name: string;
  province_id: number;
};

type District = {
  id: number;
  name: string;
  regency_id: number;
};

/* eslint-disable react-refresh/only-export-components */

export async function loader() {
  const res = await fetch("/data/indonesia_regions.json");
  const data = await res.json();
  return data;
}

export default function FilterPage() {
  const { provinces, regencies, districts } = useLoaderData() as {
    provinces: Province[];
    regencies: Regency[];
    districts: District[];
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const provinceId = searchParams.get("province");
  const regencyId = searchParams.get("regency");
  const districtId = searchParams.get("district");

  const selectedProvince = provinces.find((p) => p.id === Number(provinceId));
  const selectedRegency = regencies.find((r) => r.id === Number(regencyId));
  const selectedDistrict = districts.find((d) => d.id === Number(districtId));

  const filteredRegencies = regencies.filter(
    (r) => r.province_id === Number(provinceId)
  );

  const filteredDistricts = districts.filter(
    (d) => d.regency_id === Number(regencyId)
  );

  function updateParam(name: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(name, value);
    else params.delete(name);

    if (name === "province") {
      params.delete("regency");
      params.delete("district");
    }

    if (name === "regency") {
      params.delete("district");
    }

    setSearchParams(params);
  }

  function resetFilters() {
    setSearchParams({});
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-70 shrink-0 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
            </svg>
          </div>
          <span className="font-semibold text-gray-800 text-sm tracking-tight">Frontend Assessment</span>
        </div>

        <div className="px-6 pt-6 pb-4 flex flex-col gap-5 flex-1">

          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Filter Wilayah
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Provinsi
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                </svg>
              </span>
              <select
                name="province"
                value={provinceId ?? ""}
                onChange={(e) => updateParam("province", e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg py-2.5 pl-9 pr-8 text-sm text-gray-700 bg-white cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Kota/Kabupaten
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15" />
                </svg>
              </span>
              <select
                name="regency"
                value={regencyId ?? ""}
                onChange={(e) => updateParam("regency", e.target.value)}
                disabled={!provinceId}
                className="w-full appearance-none border border-gray-300 rounded-lg py-2.5 pl-9 pr-8 text-sm text-gray-700 bg-white cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kota / Kabupaten</option>
                {filteredRegencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Kecamatan
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </span>
              <select
                name="district"
                value={districtId ?? ""}
                onChange={(e) => updateParam("district", e.target.value)}
                disabled={!regencyId}
                className="w-full appearance-none border border-gray-300 rounded-lg py-2.5 pl-9 pr-8 text-sm text-gray-700 bg-white cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kecamatan</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="mt-4 flex items-center justify-center gap-2 w-full border-2 border-blue-600 text-blue-600 rounded-lg py-2.5 text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            RESET
          </button>

        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-0">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 px-8 py-4 text-sm text-gray-400 border-b border-gray-200 bg-white">
          <span>Indonesia</span>
          {selectedProvince && (
            <>
              <span className="text-gray-300">&gt;</span>
              <span
                className={!selectedRegency ? "text-blue-600 font-medium" : ""}
                {...(!selectedRegency ? { "aria-current": "page" as const } : {})}
              >{selectedProvince.name}</span>
            </>
          )}
          {selectedRegency && (
            <>
              <span className="text-gray-300">&gt;</span>
              <span
                className={!selectedDistrict ? "text-blue-600 font-medium" : ""}
                {...(!selectedDistrict ? { "aria-current": "page" as const } : {})}
              >{selectedRegency.name}</span>
            </>
          )}
          {selectedDistrict && (
            <>
              <span className="text-gray-300">&gt;</span>
              <span className="text-blue-600 font-medium" aria-current="page">{selectedDistrict.name}</span>
            </>
          )}
        </nav>

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center flex flex-col items-center">
            {selectedProvince && (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2">
                  Provinsi
                </p>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  {selectedProvince.name}
                </h1>
              </>
            )}

            {selectedProvince && selectedRegency && (
              <span className="my-6 text-gray-300">
                <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </span>
            )}

            {selectedRegency && (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2">
                  Kota / Kabupaten
                </p>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  {selectedRegency.name}
                </h2>
              </>
            )}

            {selectedRegency && selectedDistrict && (
              <span className="my-6 text-gray-300">
                <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </span>
            )}

            {selectedDistrict && (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2">
                  Kecamatan
                </p>
                <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                  {selectedDistrict.name}
                </h3>
              </>
            )}

            {!selectedProvince && !selectedRegency && !selectedDistrict && (
              <p className="text-gray-400 text-lg">Pilih wilayah dari sidebar untuk memulai</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}