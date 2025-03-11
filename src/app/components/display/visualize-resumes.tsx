"use client";

import { resumeSchema } from "@/app/schemas/cvSchema"
import { ResumeService } from "@/app/services/resumeService"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import resumeImage from "../assets/cvImage.png"

interface Resume {
  id: number;
  fullName: string;
  email: string;
  position: string;
  region: string;
  scholarity: string;
}

export default function VisualizeCV() {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastResumeRef = useRef<HTMLDivElement | null>(null);

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  function fetchResumes() {
    setLoading(true);
    ResumeService.getAllResumes()
      .then((fetchedResumes) => {

        const validatedResumes = fetchedResumes.map((resume: unknown) =>
          resumeSchema.parse(resume)
        );

        setResumes((prevResumes) => [...prevResumes, ...validatedResumes]);
      })
      .catch((error) => {
        console.error("Erro ao buscar currículos:", error);
        setErrorMessage("Erro ao carregar currículos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchResumes();
  }, [page]);


  function fetchMoreResumes() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreResumes();
        }
      },
      { rootMargin: "100px" }
    );

    if (lastResumeRef.current) observerRef.current.observe(lastResumeRef.current);
  }, [resumes]);

  function navigateToEdit(id: number) {
    router.push(`/curriculo-display/${id}`);
  }

  function navigateToAdd() {
    router.push("/curriculo-display/");
  }

  const filteredResumes = useMemo(() => {
    if (!searchTerm) return resumes;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return resumes.filter(
      (resume) =>
        resume.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
        resume.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        resume.position.toLowerCase().includes(lowerCaseSearchTerm) ||
        resume.region.toLowerCase().includes(lowerCaseSearchTerm) ||
        resume.scholarity.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, resumes]);

  return (
    <div
      className="flex justify-center items-center min-h-screen p-4"
      style={{ background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))" }}
    >
      <div className="w-full max-w-4xl bg-gray-800 shadow-md rounded-lg border p-6">

        <div className="flex px-4 py-3 mb-6 rounded-md border border-blue-500 bg-gray-700">
          <input
            type="text"
            placeholder="Buscar currículo..."
            className="w-full bg-transparent text-gray-300 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-gray-400 ml-2 cursor-pointer"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </div>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="flex items-center justify-center mb-6">
          <button
            onClick={navigateToAdd}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105"
          >
            Adicionar Currículo
          </button>
        </div>

        <div className="overflow-y-auto border-t border-gray-600" style={{ maxHeight: "300px" }}>
          {filteredResumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {filteredResumes.map((resume, index) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigateToEdit(resume.id)}
                  ref={index === filteredResumes.length - 1 ? lastResumeRef : null}
                >
                  <h1 className="text-gray-300 font-semibold">{resume.fullName}</h1>
                  <Image alt="Currículo" src={resumeImage} width={20} height={20} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center py-4">Nenhum currículo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
