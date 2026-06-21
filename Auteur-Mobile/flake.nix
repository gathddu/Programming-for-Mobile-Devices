{
  description = "Auteur Mobile - React Native + Expo development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js and package managers
            nodejs_22
            pnpm
            yarn

            # Development tools
            git
            watchman
            jdk
            android-tools

            # Utilities
            curl
            wget
          ];

          shellHook = ''
            echo "🎬 Auteur Mobile development environment loaded"
            echo "Node.js: $(node --version)"
            echo "pnpm: $(pnpm --version)"
            echo ""
            echo "Available commands:"
            echo "  pnpm start      - Start Expo dev server"
            echo "  pnpm run web    - Run on web"
            echo "  pnpm run android - Run on Android"
            echo "  pnpm run ios    - Run on iOS"
          '';
        };
      }
    );
}
