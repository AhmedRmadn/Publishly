import { useState, useMemo } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";

// Froala CSS + JS
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import { useUpload } from "../hooks/useUpload";
import { useUploadImage } from "../hooks/useUploadImage";
export default function Upload() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [model, setModel] = useState("");

  const { isUploading, upload } = useUpload();
  const { ImageUploading, uploadImageAsync } = useUploadImage();
  // Handle poster change
  const handlePosterChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };
  // Handle submit (title + poster + article body)
  const handleSubmit = () => {
    const articleData = {
      title: title,
      poster: poster,
      model: model,
    };
    upload(articleData);
  };
  // 2. Create the memoized config object
  const froalaConfig = useMemo(
    () => ({
      toolbarButtons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "|",
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "paragraphFormat",
        "lineHeight",
        "|",
        "formatUL",
        "formatOL",
        "outdent",
        "indent",
        "quote",
        "|",
        "insertLink",
        "insertImage",
        "insertTable",
        "|",
        "undo",
        "redo",
        "html",
      ],
      pluginsEnabled: [
        "align",
        "colors",
        "emoticons",
        "fontSize",
        "fontFamily",
        "lineHeight",
        "link",
        "lists",
        "paragraphFormat",
        "quote",
        "table",
        "url",
        "image",
      ],

      // Image upload hook (you already had this 👇)
      imageUpload: true,
      imageUploadURL: null,
      events: {
        "image.beforeUpload": async function (files) {
          if (files.length) {
            try {
              const data = await uploadImageAsync({ file: files[0] });
              this.image.insert(data.url, true, null, this.image.get(), null);
            } catch (err) {
              console.error("Upload failed", err);
            }
          }
          return false;
        },
      },
    }),
    []
  );

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-black">📝 Article Editor</h1>

        {/* Title input */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <label className="block text-sm font-medium mb-3 text-black">
            Article Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 text-lg"
            placeholder="Enter a compelling title for your article..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Choose a clear, descriptive title that will grab readers' attention
          </p>
        </div>

        {/* Poster upload */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <label className="block text-sm font-medium mb-3 text-black">
            Featured Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
            <input
              type="file"
              accept="image/*"
              onChange={handlePosterChange}
              className="hidden"
              id="poster-upload"
            />
            <label htmlFor="poster-upload" className="cursor-pointer">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {posterPreview ? "Change image" : "Click to upload image"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </label>
          </div>
          {posterPreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="relative inline-block">
                <img
                  src={posterPreview}
                  alt="Poster Preview"
                  className="w-64 h-36 object-cover rounded-lg shadow-lg border border-gray-200"
                />
                <button
                  onClick={() => {
                    setPoster(null);
                    setPosterPreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="border border-gray-200 rounded shadow-lg bg-white">
          <FroalaEditorComponent
            tag="textarea"
            model={model}
            onModelChange={setModel}
            config={froalaConfig}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-black text-white rounded shadow-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Save Article
        </button>

        {/* Article Preview */}
        {model && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-black mb-4">
              📖 Article Preview
            </h2>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="prose max-w-none">
                <div
                  className="fr-view"
                  dangerouslySetInnerHTML={{ __html: model }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Debug Preview - Commented Out */}
        {/* 
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-black">HTML Output</h2>
          <pre className="bg-gray-100 text-gray-800 p-3 rounded border border-gray-200 overflow-x-auto">
            {model}
          </pre>
        </div>
        */}
      </div>
    </div>
  );
}
