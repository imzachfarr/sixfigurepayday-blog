#!/bin/bash

echo "🚀 Setting up SixFigurePayday Automated Blog System..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
cd ..

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ Please edit .env file with your configuration"
fi

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Set up MongoDB (local or Atlas)"
echo "3. Get OpenAI API key"
echo "4. Run 'npm run dev' to start development"
echo ""
echo "🔗 Frontend: http://localhost:3000"
echo "🔗 Backend: http://localhost:5000" 