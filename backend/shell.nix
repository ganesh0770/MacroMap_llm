{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "python-backend-env";

  # Packages needed inside the shell
  buildInputs = with pkgs; [
    python312
    zlib
    glib
    killall
  ];

  # This hook automatically links libstdc++.so.6 whenever you enter the shell
  shellHook = ''
    export LD_LIBRARY_PATH="${pkgs.stdenv.cc.cc.lib}/lib:$LD_LIBRARY_PATH"
    echo "✅ Nix development shell loaded!"
    echo "💡 Type 'source .venv/bin/activate' and run your server!"
  '';
}