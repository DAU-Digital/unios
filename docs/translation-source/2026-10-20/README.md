# Bản chữ nguồn của bản dịch (20/10/2026)

Ba file `.txt` ở đây là bản chữ thường của ba file song ngữ thầy gửi ngày 20/10/2026 (Việt–Anh, Việt–Nhật, Việt–Trung). Test trong `src/content/*.test.ts` so chữ trên site với các file này.

Tạo lại bằng:

```bash
for p in Anh:vi-en Nhat:vi-ja Trung:vi-zh; do
  pandoc "/Users/lehuuphu/Downloads/UNIOS-DOCS/feedback/DAU_AI_native_Website_Song_ngu_Viet_${p%%:*}_2026-10-20.docx" \
    -t plain --wrap=none -o "docs/translation-source/2026-10-20/${p##*:}.txt"
done
```

Mục "Ghi chú thuật ngữ dịch thuật" và "Danh mục từ viết tắt" ở cuối mỗi file là quy tắc dịch, không phải nội dung site.
