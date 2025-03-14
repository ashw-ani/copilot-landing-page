import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { content, filename } = req.body;
        const filePath = path.join(process.cwd(), 'src', 'data', filename);

        // Create the data directory if it doesn't exist
        const dirPath = path.join(process.cwd(), 'src', 'data');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Initialize or read existing coordinates
        let coordinates = [];
        if (fs.existsSync(filePath)) {
            // Remove export statement if it exists
            let fileContent = fs.readFileSync(filePath, 'utf8');
            fileContent = fileContent.replace('const coordinates = ', '');
            fileContent = fileContent.replace(';\n\nexport default coordinates;\n', '');
            try {
                coordinates = JSON.parse(fileContent);
            } catch (e) {
                // If parsing fails, start with empty array
                coordinates = [];
            }
        }

        // Parse and add new coordinate
        const newCoordinate = JSON.parse(content);
        coordinates.push(newCoordinate);

        // Write the complete file with proper format
        const fileContent = `const coordinates = ${JSON.stringify(coordinates, null, 2)};\n\nexport default coordinates;\n`;
        fs.writeFileSync(filePath, fileContent);

        res.status(200).json({ 
            message: 'Position saved successfully',
            filePath: filePath
        });
    } catch (error) {
        console.error('Error saving position:', error);
        res.status(500).json({ message: 'Error saving position' });
    }
} 